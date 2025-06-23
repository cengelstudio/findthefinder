# Find The Finder

An optimized Next.js application for the lost and found item platform.

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

## �� Developer Tools

- **Prettier**: Code formatting
- **ESLint**: Code quality control
- **Husky**: Git hooks
- **Jest**: Testing framework
- **Docker**: Containerization
- **GitHub Actions**: CI/CD pipeline
- **Dependabot**: Automated dependency updates
