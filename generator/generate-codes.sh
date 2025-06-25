#!/bin/bash

# Kod üretme script'i
# Kullanım: ./generator/generate-codes.sh <kod_sayısı> [kod_uzunluğu] [prefix]

set -e

# Renkli çıktı için
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Proje kök dizinine git
cd "$(dirname "$0")/.."

echo -e "${BLUE}🔧 Kod Üretme Script'i${NC}"
echo "================================"

# Parametreleri kontrol et
if [ $# -eq 0 ]; then
    echo -e "${RED}❌ Hata: Kod sayısı belirtilmedi!${NC}"
    echo ""
    echo "Kullanım:"
    echo "  ./generator/generate-codes.sh <kod_sayısı> [kod_uzunluğu] [prefix]"
    echo ""
    echo "Örnekler:"
    echo "  ./generator/generate-codes.sh 1000"
    echo "  ./generator/generate-codes.sh 1000 8"
    echo "  ./generator/generate-codes.sh 1000 8 \"PROMO\""
    echo ""
    exit 1
fi

COUNT=$1
LENGTH=${2:-8}
PREFIX=${3:-""}

# Parametreleri doğrula
if ! [[ "$COUNT" =~ ^[0-9]+$ ]] || [ "$COUNT" -le 0 ]; then
    echo -e "${RED}❌ Hata: Geçersiz kod sayısı. Pozitif bir sayı girin.${NC}"
    exit 1
fi

if ! [[ "$LENGTH" =~ ^[0-9]+$ ]] || [ "$LENGTH" -le 0 ]; then
    echo -e "${RED}❌ Hata: Geçersiz kod uzunluğu. Pozitif bir sayı girin.${NC}"
    exit 1
fi

echo -e "${YELLOW}📊 Parametreler:${NC}"
echo "  Kod sayısı: $COUNT"
echo "  Kod uzunluğu: $LENGTH"
echo "  Prefix: ${PREFIX:-'Belirtilmedi'}"
echo ""

# Node.js ve npm'in yüklü olup olmadığını kontrol et
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Hata: Node.js yüklü değil!${NC}"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ Hata: npm yüklü değil!${NC}"
    exit 1
fi

# Bağımlılıkları kontrol et ve yükle
echo -e "${BLUE}📦 Bağımlılıklar kontrol ediliyor...${NC}"
if [ ! -d "node_modules" ]; then
    echo "node_modules bulunamadı, bağımlılıklar yükleniyor..."
    npm install
else
    echo "Bağımlılıklar mevcut."
fi

# Prisma client'ı güncelle
echo -e "${BLUE}🔧 Prisma client güncelleniyor...${NC}"
npx prisma generate

# Script'i çalıştır
echo -e "${BLUE}🚀 Kod üretme script'i çalıştırılıyor...${NC}"
echo ""

if [ -n "$PREFIX" ]; then
    node generator/generate-codes.js "$COUNT" "$LENGTH" "$PREFIX"
else
    node generator/generate-codes.js "$COUNT" "$LENGTH"
fi

echo ""
echo -e "${GREEN}✅ Script başarıyla tamamlandı!${NC}"
echo -e "${YELLOW}📁 CSV dosyası 'generator/output/' klasöründe bulunabilir.${NC}"
