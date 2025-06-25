# Kod Üretme Script'i

Bu script, veritabanındaki `code` tablosuna eşsiz kodlar üretir ve bunları CSV formatında dışa aktarır.

## Özellikler

- ✅ Eşsiz kodlar üretir (veritabanında mevcut olmayan)
- ✅ Prefix ekleme özelliği
- ✅ Kodları veritabanına kaydeder
- ✅ CSV formatında dışa aktarır (sadece kodlar)
- ✅ Özelleştirilebilir kod uzunluğu
- ✅ Not ekleme özelliği
- ✅ İlerleme göstergesi
- ✅ Hata yönetimi

## Kurulum

1. Gerekli bağımlılıkları yükleyin:
```bash
npm install
```

2. Prisma client'ı güncelleyin:
```bash
npx prisma generate
```

## Kullanım

### Bash Script ile (Önerilen)

```bash
# Temel kullanım
./generator/generate-codes.sh 1000

# Kod uzunluğu belirtme
./generator/generate-codes.sh 1000 8

# Prefix ekleme
./generator/generate-codes.sh 1000 8 "PROMO"

# Prefix ve not ekleme
./generator/generate-codes.sh 1000 8 "PROMO" "Test kodları"
```

### JavaScript ile Doğrudan

```bash
# Temel kullanım
node generator/generate-codes.js 1000

# Kod uzunluğu belirtme
node generator/generate-codes.js 1000 8

# Prefix ekleme
node generator/generate-codes.js 1000 8 "PROMO"

# Prefix ve not ekleme
node generator/generate-codes.js 1000 8 "PROMO" "Test kodları"
```

## Parametreler

| Parametre | Tip | Zorunlu | Varsayılan | Açıklama |
|-----------|-----|---------|------------|----------|
| `kod_sayısı` | number | ✅ | - | Üretilecek kod sayısı |
| `kod_uzunluğu` | number | ❌ | 8 | Kod uzunluğu (karakter) |
| `prefix` | string | ❌ | - | Kod başına eklenecek prefix |
| `not` | string | ❌ | - | Kodlar için açıklama |

## Örnekler

### 1000 adet 8 karakterlik kod üretme
```bash
./generator/generate-codes.sh 1000
```

### 500 adet 10 karakterlik kod üretme
```bash
./generator/generate-codes.sh 500 10
```

### 2000 adet kod üretme ve prefix ekleme
```bash
./generator/generate-codes.sh 2000 8 "PROMO"
```

### Prefix ve not ile kod üretme
```bash
./generator/generate-codes.sh 1000 8 "PROMO" "Promosyon kodları 2024"
```

## Çıktılar

### Konsol Çıktısı
Script çalışırken aşağıdaki bilgileri gösterir:
- Üretilen kod sayısı
- Prefix bilgisi (varsa)
- Veritabanına kaydedilen kod sayısı
- İşlem durumu
- Hata mesajları (varsa)

### CSV Dosyası
`generator/output/` klasöründe aşağıdaki formatta CSV dosyası oluşturulur:

```
PROMOABC12345;PROMOXYZ67890;PROMODEF45678
```

**Not**: CSV dosyası sadece kodları içerir, noktalı virgülle ayrılmış şekilde.

### Veritabanı
Kodlar `code` tablosuna aşağıdaki alanlarla kaydedilir:
- `content`: Üretilen kod (prefix dahil)
- `note`: Belirtilen not veya varsayılan not
- `created_at`: Oluşturulma tarihi
- `updated_at`: Güncellenme tarihi

## Kod Formatı

Üretilen kodlar:
- Prefix + rastgele karakterler şeklinde oluşur
- Sadece büyük harfler (A-Z) ve rakamlar (0-9) içerir
- Belirtilen uzunlukta olur (prefix hariç)
- Veritabanında benzersizdir
- Okunabilir ve yazılabilir formattadır

### Prefix Örnekleri

```bash
# PROMO prefix'i ile
./generator/generate-codes.sh 100 8 "PROMO"
# Sonuç: PROMOABC12345, PROMOXYZ67890, ...

# VIP prefix'i ile
./generator/generate-codes.sh 100 8 "VIP"
# Sonuç: VIPABC12345, VIPXYZ67890, ...

# Prefix olmadan
./generator/generate-codes.sh 100 8
# Sonuç: ABC12345, XYZ67890, ...
```

## Güvenlik

- Script, mevcut kodları kontrol ederek çakışmaları önler
- Veritabanı bağlantısı güvenli şekilde kapatılır
- Hata durumunda temiz çıkış yapar

## Sorun Giderme

### "Veritabanı bağlantı hatası"
- Prisma schema dosyasını kontrol edin
- Veritabanı bağlantı bilgilerini doğrulayın
- `npx prisma generate` komutunu çalıştırın

### "Kod üretilemedi"
- Kod uzunluğunu azaltın
- Daha az kod sayısı deneyin
- Veritabanında çok fazla kod varsa, farklı bir uzunluk deneyin

### "Permission denied"
- Script dosyasının çalıştırılabilir olduğundan emin olun:
```bash
chmod +x generator/generate-codes.sh
```

## Geliştirme

Script'i özelleştirmek için `generator/generate-codes.js` dosyasını düzenleyebilirsiniz:

- Kod karakter setini değiştirmek için `generateUniqueCode` fonksiyonunu düzenleyin
- CSV formatını değiştirmek için `saveCodesToCSV` fonksiyonunu düzenleyin
- Veritabanı alanlarını değiştirmek için `saveCodesToDatabase` fonksiyonunu düzenleyin

## Lisans

Bu script projenin genel lisansı altında dağıtılır.
