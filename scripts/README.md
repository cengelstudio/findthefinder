# 📜 Scripts Klasörü

Bu klasör Next.js projeniz için faydalı script'leri içerir.

## 🚀 Kullanılabilir Script'ler

### Production Scripts

#### `start-prod.sh`
- **Amaç**: Production ortamında uygulamayı 3000 portunda çalıştırır
- **Kullanım**: `./scripts/start-prod.sh`
- **Özellikler**:
  - Build kontrolü yapar
  - Gerekirse otomatik build eder
  - PORT=3000 olarak ayarlar
  - NODE_ENV=production olarak ayarlar

#### `deploy.sh`
- **Amaç**: Uygulamayı production'a deploy eder
- **Kullanım**: `./scripts/deploy.sh`
- **Özellikler**:
  - Git'ten son değişiklikleri çeker
  - Backup oluşturur
  - Dependencies'leri yükler
  - Build yapar
  - PM2 veya systemctl ile restart eder

### Development Scripts

#### `start-dev.sh`
- **Amaç**: Development server'ı başlatır
- **Kullanım**: `./scripts/start-dev.sh`
- **Özellikler**:
  - node_modules yoksa dependencies'leri yükler
  - Development modunda çalıştırır

#### `install.sh`
- **Amaç**: Dependencies'leri temiz şekilde yükler
- **Kullanım**: `./scripts/install.sh`
- **Özellikler**:
  - Node.js ve npm versiyonlarını kontrol eder
  - Önceki kurulumları temizler
  - Husky'i setup eder

### Build & Test Scripts

#### `build.sh`
- **Amaç**: Projeyi build eder
- **Kullanım**: `./scripts/build.sh`
- **Özellikler**:
  - Önceki build'i temizler
  - Type check yapar
  - Lint kontrol yapar
  - Build size analizi yapar

#### `test.sh`
- **Amaç**: Test'leri çalıştırır
- **Kullanım**:
  - `./scripts/test.sh` (normal test)
  - `./scripts/test.sh --watch` (watch mode)
  - `./scripts/test.sh --coverage` (coverage ile)
- **Özellikler**:
  - CI environment'ı algılar
  - Watch mode ve coverage desteği
  - Help menüsü

### Database Scripts

#### `db-setup.sh`
- **Amaç**: Prisma database'ini setup eder
- **Kullanım**: `./scripts/db-setup.sh`
- **Özellikler**:
  - Prisma client generate eder
  - Database schema'yı push eder
  - Prisma Studio önerisi verir

### Monitoring Scripts

#### `health-check.sh`
- **Amaç**: Uygulamanın sağlık durumunu kontrol eder
- **Kullanım**: `./scripts/health-check.sh`
- **Özellikler**:
  - HTTP response kontrolü
  - API endpoint kontrolü
  - Process kontrolü
  - Port kullanım analizi

## 🔧 Kurulum

Script'leri kullanmadan önce çalıştırılabilir izinleri verilmiştir:

```bash
chmod +x scripts/*.sh
```

## 📖 Örnek Kullanım Senaryoları

### Development Başlatma
```bash
# Dependencies'leri yükle
./scripts/install.sh

# Development server'ı başlat
./scripts/start-dev.sh
```

### Production Deployment
```bash
# Build yap
./scripts/build.sh

# Production'da çalıştır
./scripts/start-prod.sh

# Alternatif: Deploy script ile
./scripts/deploy.sh
```

### Test & Quality Control
```bash
# Test'leri çalıştır
./scripts/test.sh

# Coverage ile test
./scripts/test.sh --coverage

# Sağlık kontrolü
./scripts/health-check.sh
```

### Database Setup
```bash
# Database'i setup et
./scripts/db-setup.sh
```

## 🛠️ Özelleştirme

Script'leri projenizin ihtiyaçlarına göre özelleştirebilirsiniz:

- **Port değiştirme**: `start-prod.sh` içindeki `PORT` değişkenini değiştirin
- **Environment variables**: Her script'te `.env` dosyası source edebilirsiniz
- **Deployment hedefi**: `deploy.sh` içindeki restart komutlarını özelleştirin

## 🐛 Sorun Giderme

- Script çalışmıyorsa önce `chmod +x scripts/script-adi.sh` ile izin verin
- Port 3000 meşgulse `netstat -tulpn | grep :3000` ile kontrol edin
- Health check fail ederse `./scripts/health-check.sh` ile detaylı analiz yapın

## 📝 Notlar

- Tüm script'ler proje root dizininde çalıştırılmalıdır
- Production script'leri `NODE_ENV=production` ayarlar
- Development script'leri `NODE_ENV=development` ayarlar
- Script'ler emoji kullanarak daha okunabilir çıktı verir
