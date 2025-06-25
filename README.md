# Find The Finder - Next.js App

Find The Finder; Kaza, tehlike, doğal afet ve kişisel dalgınlık sonucu oluşan mal veya can kaybına karşı en hızlı şekilde ulaşmayı sağlayan bir araçtır.

## 🚀 GitHub Pages Deployment

Bu proje GitHub Pages'da otomatik olarak deploy edilecek şekilde yapılandırılmıştır.

### Deployment Süreci

1. `main` branch'e push yaptığınızda otomatik deployment başlar
2. GitHub Actions workflow'u çalışır:
   - Dependencies yüklenir
   - Testler çalıştırılır
   - Linting kontrolü yapılır
   - Proje build edilir ve static export alınır
   - GitHub Pages'a deploy edilir

### GitHub Pages Ayarları

Repository ayarlarında GitHub Pages'i etkinleştirmek için:

1. Repository > Settings > Pages
2. Source: "Deploy from a branch"
3. Branch: "gh-pages"
4. Folder: "/ (root)"

### Önemli Notlar

- Proje static export modunda çalışır
- API route'lar GitHub Pages'da çalışmaz (static site)
- Proje repository adını otomatik olarak base path olarak kullanır

## 🛠️ Development

```bash
# Dependencies yükle
npm install

# Development server başlat
npm run dev

# Build al
npm run build

# Static export oluştur
npm run export

# Testleri çalıştır
npm run test

# Linting
npm run lint
```

## 📁 Project Structure

```
nextapp/
├── .github/workflows/     # GitHub Actions workflows
├── components/            # React components
├── pages/                # Next.js pages
├── styles/               # CSS modules
├── locales/              # i18n translations
├── lib/                  # Utility functions
├── __tests__/            # Test files
└── public/               # Static assets
```

## 🌐 Deployment URLs

- Production: `https://[username].github.io/[repository-name]/`
- Development: `http://localhost:3000`

## 🔧 Configuration

- `next.config.js` - Next.js ve GitHub Pages konfigürasyonu
- `i18n.json` - Çoklu dil desteği
- `.github/workflows/deploy.yml` - GitHub Actions deployment

## 📝 Features

- ✅ Responsive design
- ✅ Multi-language support (TR, EN, FR, DE, ES, IT, RU, GR)
- ✅ SEO optimized
- ✅ Automatic GitHub Pages deployment
- ✅ Jest testing
- ✅ ESLint + Prettier
- ✅ TypeScript support

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 🚀 Project Structure

```
nextapp/
├── components/         # React components
│   ├── Header/        # Header component
│   └── Footer/        # Footer component
├── pages/             # Next.js pages
│   ├── api/           # API endpoints
│   │   └── users/     # User APIs
│   └── lost_found/    # Lost/Found pages
├── lib/               # Utility functions
├── types/             # TypeScript type definitions
├── styles/            # CSS modules
├── locales/           # Multi-language files
├── __tests__/         # Test files
├── public/            # Static files
├── prisma/            # Database schema
└── .github/           # CI/CD workflows
```

## 🛠️ Technologies

- **Next.js 13.1.1** - React framework
- **TypeScript 4.9.4** - Type safety
- **Prisma 4.8.1** - Database ORM
- **i18next** - Multi-language support
- **Jest & Testing Library** - Testing framework
- **Prettier** - Code formatting
- **ESLint** - Code quality
- **Husky** - Git hooks
- **Docker** - Containerization
- **Nodemailer** - Email delivery
- **Twilio** - SMS delivery

## 📦 Installation

1. Install dependencies:

```bash
npm install
# or
yarn install
```

2. Setup environment variables:

```bash
cp env.example .env.local
# Edit .env.local file
```

3. Setup database:

```bash
npx prisma generate
npx prisma db push
```

4. Install Husky:

```bash
npm run prepare
```

5. Start development server:

```bash
npm run dev
# or
yarn dev
```

## 🔧 Development

### Code Quality

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

The project uses Husky for automatic code quality checks before commits:

- ESLint validation
- Prettier formatting
- TypeScript type checking

### Docker

```bash
# Build image
docker build -t findthefinder .

# Run container
docker run -p 3000:3000 findthefinder
```

## 🌐 Multi-Language Support

Supported languages:

- 🇹🇷 Türkçe (tr)
- 🇬🇧 English (en)
- 🇫🇷 Français (fr)
- 🇷🇺 Русский (ru)
- 🇪🇸 Español (es)
- 🇮🇹 Italiano (it)
- 🇩🇪 Deutsch (de)
- 🇬🇷 Ελληνικά (gr)

## 📝 API Endpoints

### User Operations

- `POST /api/users/sign_up` - User registration
- `POST /api/users/login` - User login
- `POST /api/users/forgot_password` - Password reset
- `GET /api/users/session` - Session validation
- `PUT /api/users/update` - Profile update
- `DELETE /api/users/delete` - Account deletion

### Lost/Found Operations

- `POST /api/found` - Item found notification
- `POST /api/send_message` - Send message
- `GET /api/label_control` - Label validation

## 🧪 Testing

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

## 🚀 Production

To build for production:

```bash
npm run build
npm start
```

With Docker:

```bash
docker build -t findthefinder .
docker run -p 3000:3000 findthefinder
```

## 🔧 Developer Tools

- **Prettier**: Code formatting
- **ESLint**: Code quality control
- **Husky**: Git hooks
- **Jest**: Testing framework
- **Docker**: Containerization
- **GitHub Actions**: CI/CD pipeline
- **Dependabot**: Automated dependency updates
