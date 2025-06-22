# FindTheFinder Next.js Application

Bu proje, kayıp eşya bulma platformu için optimize edilmiş Next.js uygulamasıdır.

## 🚀 Proje Yapısı

```
nextapp/
├── components/         # React bileşenleri
│   ├── Header/        # Header bileşeni
│   └── Footer/        # Footer bileşeni
├── pages/             # Next.js sayfaları
│   ├── api/           # API endpoint'leri
│   │   └── users/     # Kullanıcı API'leri
│   └── lost_found/    # Kayıp/Bulunan sayfaları
├── lib/               # Yardımcı fonksiyonlar
├── types/             # TypeScript tip tanımları
├── styles/            # CSS modülleri
├── locales/           # Çoklu dil dosyaları
├── __tests__/         # Test dosyaları
├── public/            # Statik dosyalar
├── prisma/            # Veritabanı şeması
└── .github/           # CI/CD workflows
```

## 🛠️ Teknolojiler

- **Next.js 13.1.1** - React framework
- **TypeScript 4.9.4** - Tip güvenliği
- **Prisma 4.8.1** - Veritabanı ORM
- **i18next** - Çoklu dil desteği
- **Jest & Testing Library** - Test framework
- **Prettier** - Kod formatlaması
- **ESLint** - Kod kalitesi
- **Husky** - Git hooks
- **Docker** - Containerization
- **Nodemailer** - E-posta gönderimi
- **Twilio** - SMS gönderimi

## 📦 Kurulum

1. Bağımlılıkları yükleyin:

```bash
npm install
# veya
yarn install
```

2. Environment değişkenlerini ayarlayın:

```bash
cp env.example .env.local
# .env.local dosyasını düzenleyin
```

3. Veritabanını hazırlayın:

```bash
npx prisma generate
npx prisma db push
```

4. Husky'yi kurun:

```bash
npm run prepare
```

5. Geliştirme sunucusunu başlatın:

```bash
npm run dev
# veya
yarn dev
```

## 🔧 Geliştirme

### Kod Kalitesi

```bash
# Linting
npm run lint
npm run lint:fix

# Formatting
npm run format
npm run format:check

# Type checking
npm run type-check

# Testing
npm test
npm run test:watch
npm run test:coverage
```

### Git Hooks

Proje, commit öncesi otomatik kod kontrolü için Husky kullanır:

- ESLint kontrolü
- Prettier formatlaması
- TypeScript tip kontrolü

### Docker

```bash
# Build image
docker build -t findthefinder .

# Run container
docker run -p 3000:3000 findthefinder
```

## 🌐 Çoklu Dil Desteği

Desteklenen diller:

- 🇹🇷 Türkçe (tr)
- 🇬🇧 English (en)
- 🇫🇷 Français (fr)
- 🇷🇺 Русский (ru)
- 🇪🇸 Español (es)
- 🇮🇹 Italiano (it)
- 🇩🇪 Deutsch (de)
- 🇬🇷 Ελληνικά (gr)

## 📝 API Endpoints

### Kullanıcı İşlemleri

- `POST /api/users/sign_up` - Kayıt olma
- `POST /api/users/login` - Giriş yapma
- `POST /api/users/forgot_password` - Şifre sıfırlama
- `GET /api/users/session` - Oturum kontrolü
- `PUT /api/users/update` - Profil güncelleme
- `DELETE /api/users/delete` - Hesap silme

### Kayıp/Bulunan İşlemleri

- `POST /api/found` - Eşya bulundu bildirimi
- `POST /api/send_message` - Mesaj gönderme
- `GET /api/label_control` - Etiket kontrolü

## 🧪 Test

```bash
# Tüm testleri çalıştır
npm test

# Watch mode
npm run test:watch

# Coverage raporu
npm run test:coverage
```

## 🚀 Production

Build almak için:

```bash
npm run build
npm start
```

Docker ile:

```bash
docker build -t findthefinder .
docker run -p 3000:3000 findthefinder
```

## 📄 Lisans

Bu proje özel kullanım içindir.

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 🔧 Geliştirici Araçları

- **Prettier**: Kod formatlaması
- **ESLint**: Kod kalitesi kontrolü
- **Husky**: Git hooks
- **Jest**: Test framework
- **Docker**: Containerization
- **GitHub Actions**: CI/CD pipeline
