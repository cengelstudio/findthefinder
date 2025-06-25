#!/usr/bin/env node

const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

/**
 * Eşsiz kod üretir
 * @param {number} length Kod uzunluğu
 * @returns {string} Eşsiz kod
 */
function generateUniqueCode(length = 8) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code;

  do {
    code = '';
    for (let i = 0; i < length; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
  } while (code.length !== length);

  return code;
}

/**
 * Veritabanında kodun var olup olmadığını kontrol eder
 * @param {string} code Kontrol edilecek kod
 * @returns {Promise<boolean>} Kod varsa true, yoksa false
 */
async function codeExists(code) {
  const existingCode = await prisma.code.findUnique({
    where: { content: code }
  });
  return !!existingCode;
}

/**
 * Mevcut kodları veritabanından alır (eşsizlik kontrolü için)
 * @returns {Promise<Set<string>>} Mevcut kodlar seti
 */
async function getExistingCodes() {
  const existingCodes = await prisma.code.findMany({
    select: { content: true }
  });
  return new Set(existingCodes.map(code => code.content));
}

/**
 * Eşsiz kodlar üretir
 * @param {number} count Üretilecek kod sayısı
 * @param {number} length Kod uzunluğu
 * @param {string} prefix Kod prefix'i
 * @returns {Promise<string[]>} Eşsiz kodlar dizisi
 */
async function generateUniqueCodes(count, length = 8, prefix = '') {
  const codes = [];
  const maxAttempts = count * 1000; // Daha fazla deneme hakkı
  let attempts = 0;

  console.log(`${count} adet eşsiz kod üretiliyor...`);
  if (prefix) {
    console.log(`Prefix: ${prefix}`);
  }

  // Mevcut kodları bir kerede al
  console.log('Mevcut kodlar kontrol ediliyor...');
  const existingCodes = await getExistingCodes();
  console.log(`Veritabanında ${existingCodes.size} adet mevcut kod bulundu.`);

  while (codes.length < count && attempts < maxAttempts) {
    attempts++;
    const baseCode = generateUniqueCode(length);
    const fullCode = prefix + baseCode;

    // Hem yerel dizide hem de veritabanında kontrol et
    if (!codes.includes(fullCode) && !existingCodes.has(fullCode)) {
      codes.push(fullCode);
      existingCodes.add(fullCode); // Yeni kodu set'e ekle

      if (codes.length % 100 === 0) {
        console.log(`${codes.length}/${count} kod üretildi... (${attempts} deneme)`);
      }
    }
  }

  if (codes.length < count) {
    console.warn(`Uyarı: Sadece ${codes.length} adet eşsiz kod üretilebildi. (${attempts} deneme yapıldı)`);
    console.warn('Daha fazla kod üretmek için kod uzunluğunu artırın veya prefix değiştirin.');
  } else {
    console.log(`✅ ${codes.length} adet eşsiz kod başarıyla üretildi. (${attempts} deneme)`);
  }

  return codes;
}

/**
 * Kodları veritabanına kaydeder
 * @param {string[]} codes Kaydedilecek kodlar
 * @returns {Promise<number>} Kaydedilen kod sayısı
 */
async function saveCodesToDatabase(codes) {
  console.log('Kodlar veritabanına kaydediliyor...');

  const codeData = codes.map(code => ({
    content: code,
    note: ``,
    created_at: new Date(),
    updated_at: new Date()
  }));

  try {
    const result = await prisma.code.createMany({
      data: codeData,
      skipDuplicates: true
    });

    console.log(`${result.count} adet kod başarıyla veritabanına kaydedildi.`);
    return result.count;
  } catch (error) {
    console.error('Veritabanına kaydetme hatası:', error);
    throw error;
  }
}

/**
 * Kodları CSV formatında dosyaya kaydeder (sadece kodlar, noktalı virgülle ayrılmış)
 * @param {string[]} codes Kaydedilecek kodlar
 * @param {string} filename Dosya adı
 */
function saveCodesToCSV(codes, filename) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const defaultFilename = `generated-codes-${timestamp}.csv`;
  const finalFilename = filename || defaultFilename;

  // Sadece kodları noktalı virgülle ayırarak kaydet
  const csvContent = codes.join(';');

  // Generator dizini içinde output klasörü oluştur
  const outputPath = path.join(__dirname, 'output', finalFilename);

  // output klasörünü oluştur
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, csvContent, 'utf8');
  console.log(`CSV dosyası kaydedildi: ${outputPath}`);
}

/**
 * Ana fonksiyon
 */
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Kullanım: node generator/generate-codes.js <kod_sayısı> [kod_uzunluğu] [prefix]');
    console.log('Örnek: node generator/generate-codes.js 1000 8 "PROMO"');
    process.exit(1);
  }

  const count = parseInt(args[0]);
  const length = args[1] ? parseInt(args[1]) : 8;
  const prefix = args[2] || '';

  if (isNaN(count) || count <= 0) {
    console.error('Geçersiz kod sayısı. Pozitif bir sayı girin.');
    process.exit(1);
  }

  if (isNaN(length) || length <= 0) {
    console.error('Geçersiz kod uzunluğu. Pozitif bir sayı girin.');
    process.exit(1);
  }

  try {
    console.log(`Başlatılıyor: ${count} adet ${length} karakterlik kod üretimi`);
    if (prefix) {
      console.log(`Prefix: ${prefix}`);
    }

    // Eşsiz kodları üret
    const codes = await generateUniqueCodes(count, length, prefix);

    if (codes.length === 0) {
      console.error('Hiç kod üretilemedi.');
      process.exit(1);
    }

    // Veritabanına kaydet
    const savedCount = await saveCodesToDatabase(codes);

    // CSV dosyasına kaydet
    saveCodesToCSV(codes);

    console.log('\n✅ İşlem tamamlandı!');
    console.log(`📊 Üretilen kod sayısı: ${codes.length}`);
    console.log(`💾 Veritabanına kaydedilen: ${savedCount}`);
    console.log(`📁 CSV dosyası: generator/output/ klasöründe`);

  } catch (error) {
    console.error('❌ Hata oluştu:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Script çalıştırılıyorsa main fonksiyonunu çağır
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { generateUniqueCodes, saveCodesToDatabase, saveCodesToCSV };
