# Code Generator

## Kullanım

### Bash Script

```bash
# Temel kullanım
./generator/generate-codes.sh 1000

# Kod uzunluğu belirtme
./generator/generate-codes.sh 1000 8

# Prefix ekleme
./generator/generate-codes.sh 1000 8 "Prefix"

# Prefix ve not ekleme
./generator/generate-codes.sh 1000 8 "Prefix" "Not buraya"
```

### JavaScript ile Doğrudan

```bash
# Temel kullanım
node generator/generate-codes.js 1000

# Kod uzunluğu belirtme
node generator/generate-codes.js 1000 8

# Prefix ekleme
node generator/generate-codes.js 1000 8 "Prefix"

# Prefix ve not ekleme
node generator/generate-codes.js 1000 8 "Prefix" "Not buraya"
```

## Parametreler

| Parametre | Tip | Zorunlu | Varsayılan | Açıklama |
|-----------|-----|---------|------------|----------|
| `kod_sayısı` | number | ✅ | - | Üretilecek kod sayısı |
| `kod_uzunluğu` | number | ❌ | 8 | Kod uzunluğu (karakter) |
| `prefix` | string | ❌ | - | Kod başına eklenecek prefix |
| `not` | string | ❌ | - | Kodlar için açıklama |


## Çıktılar

### Konsol Çıktısı
Script çalışırken aşağıdaki bilgileri gösterir:
- Üretilen kod sayısı
- Prefix bilgisi (varsa)
- Veritabanına kaydedilen kod sayısı
- İşlem durumu
- Hata mesajları (varsa)

### CSV Dosyası
`output/` klasöründe aşağıdaki formatta CSV dosyası oluşturulur:

```
prefixABC12345;prefixXYZ67890;prefixEF45678
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
