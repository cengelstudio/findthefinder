export interface SEOData {
  title: string;
  description: string;
  keywords: string;
  ogTitle?: string;
  ogDescription?: string;
}

export interface SEOConfig {
  [locale: string]: {
    [page: string]: SEOData;
  };
}

export const seoConfig: SEOConfig = {
  tr: {
    '/': {
      title: 'Find The Finder - Kayıp Eşyalarınızı Bulun',
      description: 'Kayıp eşyalarınızı bulmanın en kolay yolu. QR kodlu etiketlerle eşyalarınızı güvende tutun ve kaybettiğinizde kolayca geri alın.',
      keywords: 'kayıp eşya, bulundu etiketi, qr kod, güvenlik etiketi, kayıp telefon, kayıp çanta',
      ogTitle: 'Find The Finder - Kayıp Eşyalarınızı Bulun',
      ogDescription: 'QR kodlu güvenlik etiketleriyle eşyalarınızı koruyun'
    },
    '/lost_found': {
      title: 'Buldum - Find The Finder',
      description: 'Kayıp bir eşya buldunuz mu? QR kodu tarayın ve sahibine ulaştırın. Ödüllü program ile yardımlarınız takdir edilir.',
      keywords: 'buldum, kayıp eşya buldum, qr kod tarama, kayıp eşya iade, ödül programı',
      ogTitle: 'Buldum - Kayıp Eşya İade Sistemi',
      ogDescription: 'Bulduğunuz kayıp eşyayı sahibine ulaştırın'
    },
    '/sign_in': {
      title: 'Giriş Yap - Find The Finder',
      description: 'Find The Finder hesabınıza giriş yapın. Etiketlerinizi yönetin ve kayıp eşya bildirimlerinizi kontrol edin.',
      keywords: 'giriş yap, hesap girişi, find the finder giriş, kullanıcı girişi',
      ogTitle: 'Find The Finder - Giriş Yap',
      ogDescription: 'Hesabınıza giriş yapın'
    },
    '/sign_up': {
      title: 'Kayıt Ol - Find The Finder',
      description: 'Find The Finder\'a kayıt olun ve eşyalarınızı güvende tutun. Ücretsiz hesap oluşturun ve etiketlerinizi aktifleştirin.',
      keywords: 'kayıt ol, hesap oluştur, ücretsiz kayıt, find the finder kayıt',
      ogTitle: 'Find The Finder - Kayıt Ol',
      ogDescription: 'Ücretsiz hesap oluşturun'
    },
    '/account': {
      title: 'Hesabım - Find The Finder',
      description: 'Hesap bilgilerinizi yönetin, etiketlerinizi kontrol edin ve kişisel bilgilerinizi güncelleyin.',
      keywords: 'hesap yönetimi, profil, etiket yönetimi, kişisel bilgiler',
      ogTitle: 'Hesabım - Find The Finder',
      ogDescription: 'Hesabınızı yönetin'
    },
    '/faq': {
      title: 'Sıkça Sorulan Sorular - Find The Finder',
      description: 'Find The Finder hakkında merak ettiğiniz tüm soruların cevapları. Nasıl çalışır, güvenlik, fiyatlandırma ve daha fazlası.',
      keywords: 'sss, sıkça sorulan sorular, yardım, nasıl çalışır, güvenlik',
      ogTitle: 'SSS - Find The Finder',
      ogDescription: 'Sıkça sorulan soruların cevapları'
    },
    '/forgot_password': {
      title: 'Şifre Sıfırlama - Find The Finder',
      description: 'Şifrenizi mi unuttunuz? E-posta adresinizi girin ve şifre sıfırlama linkini alın.',
      keywords: 'şifre sıfırlama, şifremi unuttum, şifre yenileme',
      ogTitle: 'Şifre Sıfırlama - Find The Finder',
      ogDescription: 'Şifrenizi sıfırlayın'
    },
    '/warning': {
      title: 'Uyarı - Find The Finder',
      description: 'Find The Finder kullanımı ile ilgili önemli uyarılar ve güvenlik bilgileri.',
      keywords: 'uyarı, güvenlik, kullanım koşulları, önemli bilgiler',
      ogTitle: 'Uyarı - Find The Finder',
      ogDescription: 'Önemli uyarılar ve güvenlik bilgileri'
    }
  },
  en: {
    '/': {
      title: 'Find The Finder - Find Your Lost Items',
      description: 'The easiest way to find your lost items. Keep your belongings safe with QR coded labels and easily retrieve them when lost.',
      keywords: 'lost items, found label, qr code, security tag, lost phone, lost bag',
      ogTitle: 'Find The Finder - Find Your Lost Items',
      ogDescription: 'Protect your belongings with QR coded security labels'
    },
    '/lost_found': {
      title: 'I Found - Find The Finder',
      description: 'Did you find a lost item? Scan the QR code and help return it to its owner. Rewarded program appreciates your help.',
      keywords: 'found item, lost item found, qr code scan, lost item return, reward program',
      ogTitle: 'I Found - Lost Item Return System',
      ogDescription: 'Help return lost items to their owners'
    },
    '/sign_in': {
      title: 'Sign In - Find The Finder',
      description: 'Sign in to your Find The Finder account. Manage your labels and check your lost item notifications.',
      keywords: 'sign in, account login, find the finder login, user login',
      ogTitle: 'Find The Finder - Sign In',
      ogDescription: 'Sign in to your account'
    },
    '/sign_up': {
      title: 'Sign Up - Find The Finder',
      description: 'Sign up for Find The Finder and keep your belongings safe. Create a free account and activate your labels.',
      keywords: 'sign up, create account, free registration, find the finder registration',
      ogTitle: 'Find The Finder - Sign Up',
      ogDescription: 'Create your free account'
    },
    '/account': {
      title: 'My Account - Find The Finder',
      description: 'Manage your account information, check your labels and update your personal details.',
      keywords: 'account management, profile, label management, personal information',
      ogTitle: 'My Account - Find The Finder',
      ogDescription: 'Manage your account'
    },
    '/faq': {
      title: 'Frequently Asked Questions - Find The Finder',
      description: 'Answers to all your questions about Find The Finder. How it works, security, pricing and more.',
      keywords: 'faq, frequently asked questions, help, how it works, security',
      ogTitle: 'FAQ - Find The Finder',
      ogDescription: 'Frequently asked questions answered'
    },
    '/forgot_password': {
      title: 'Reset Password - Find The Finder',
      description: 'Forgot your password? Enter your email address and receive a password reset link.',
      keywords: 'password reset, forgot password, password recovery',
      ogTitle: 'Reset Password - Find The Finder',
      ogDescription: 'Reset your password'
    },
    '/warning': {
      title: 'Warning - Find The Finder',
      description: 'Important warnings and security information regarding Find The Finder usage.',
      keywords: 'warning, security, terms of use, important information',
      ogTitle: 'Warning - Find The Finder',
      ogDescription: 'Important warnings and security information'
    }
  },
  de: {
    '/': {
      title: 'Find The Finder - Finden Sie Ihre Verlorenen Gegenstände',
      description: 'Der einfachste Weg, Ihre verlorenen Gegenstände zu finden. Schützen Sie Ihre Sachen mit QR-Code-Etiketten.',
      keywords: 'verlorene gegenstände, fundzettel, qr code, sicherheitsetikett, verlorenes telefon',
      ogTitle: 'Find The Finder - Verlorene Gegenstände Finden',
      ogDescription: 'Schützen Sie Ihre Gegenstände mit QR-Code-Etiketten'
    },
    '/lost_found': {
      title: 'Ich Habe Gefunden - Find The Finder',
      description: 'Haben Sie einen verlorenen Gegenstand gefunden? Scannen Sie den QR-Code und helfen Sie, ihn zurückzugeben.',
      keywords: 'gegenstand gefunden, verlorener gegenstand gefunden, qr code scannen, belohnungsprogramm',
      ogTitle: 'Ich Habe Gefunden - Verlorene Gegenstände Rückgabe',
      ogDescription: 'Helfen Sie dabei, verlorene Gegenstände zurückzugeben'
    },
    '/sign_in': {
      title: 'Anmelden - Find The Finder',
      description: 'Melden Sie sich bei Ihrem Find The Finder Konto an. Verwalten Sie Ihre Etiketten.',
      keywords: 'anmelden, konto login, find the finder anmeldung',
      ogTitle: 'Find The Finder - Anmelden',
      ogDescription: 'Bei Ihrem Konto anmelden'
    },
    '/sign_up': {
      title: 'Registrieren - Find The Finder',
      description: 'Registrieren Sie sich bei Find The Finder. Erstellen Sie ein kostenloses Konto.',
      keywords: 'registrieren, konto erstellen, kostenlose registrierung',
      ogTitle: 'Find The Finder - Registrieren',
      ogDescription: 'Kostenloses Konto erstellen'
    },
    '/account': {
      title: 'Mein Konto - Find The Finder',
      description: 'Verwalten Sie Ihre Kontoinformationen und Etiketten.',
      keywords: 'kontoverwaltung, profil, etikettenverwaltung',
      ogTitle: 'Mein Konto - Find The Finder',
      ogDescription: 'Ihr Konto verwalten'
    },
    '/faq': {
      title: 'Häufig Gestellte Fragen - Find The Finder',
      description: 'Antworten auf alle Ihre Fragen zu Find The Finder. Wie es funktioniert, Sicherheit und mehr.',
      keywords: 'faq, häufig gestellte fragen, hilfe, wie es funktioniert',
      ogTitle: 'FAQ - Find The Finder',
      ogDescription: 'Häufig gestellte Fragen beantwortet'
    },
    '/forgot_password': {
      title: 'Passwort Zurücksetzen - Find The Finder',
      description: 'Passwort vergessen? Geben Sie Ihre E-Mail-Adresse ein.',
      keywords: 'passwort zurücksetzen, passwort vergessen',
      ogTitle: 'Passwort Zurücksetzen - Find The Finder',
      ogDescription: 'Ihr Passwort zurücksetzen'
    },
    '/warning': {
      title: 'Warnung - Find The Finder',
      description: 'Wichtige Warnungen und Sicherheitsinformationen zur Nutzung von Find The Finder.',
      keywords: 'warnung, sicherheit, nutzungsbedingungen',
      ogTitle: 'Warnung - Find The Finder',
      ogDescription: 'Wichtige Warnungen und Sicherheitsinformationen'
    }
  },
  fr: {
    '/': {
      title: 'Find The Finder - Trouvez Vos Objets Perdus',
      description: 'Le moyen le plus simple de retrouver vos objets perdus. Protégez vos affaires avec des étiquettes QR.',
      keywords: 'objets perdus, étiquette trouvée, code qr, étiquette sécurité, téléphone perdu',
      ogTitle: 'Find The Finder - Trouvez Vos Objets Perdus',
      ogDescription: 'Protégez vos objets avec des étiquettes QR'
    },
    '/lost_found': {
      title: 'J\'ai Trouvé - Find The Finder',
      description: 'Vous avez trouvé un objet perdu ? Scannez le code QR et aidez à le rendre à son propriétaire.',
      keywords: 'objet trouvé, objet perdu trouvé, scanner code qr, programme de récompense',
      ogTitle: 'J\'ai Trouvé - Système de Retour d\'Objets Perdus',
      ogDescription: 'Aidez à retourner les objets perdus à leurs propriétaires'
    },
    '/sign_in': {
      title: 'Se Connecter - Find The Finder',
      description: 'Connectez-vous à votre compte Find The Finder. Gérez vos étiquettes.',
      keywords: 'se connecter, connexion compte, find the finder connexion',
      ogTitle: 'Find The Finder - Se Connecter',
      ogDescription: 'Se connecter à votre compte'
    },
    '/sign_up': {
      title: 'S\'inscrire - Find The Finder',
      description: 'Inscrivez-vous à Find The Finder. Créez un compte gratuit.',
      keywords: 's\'inscrire, créer compte, inscription gratuite',
      ogTitle: 'Find The Finder - S\'inscrire',
      ogDescription: 'Créer votre compte gratuit'
    },
    '/account': {
      title: 'Mon Compte - Find The Finder',
      description: 'Gérez vos informations de compte et vos étiquettes.',
      keywords: 'gestion compte, profil, gestion étiquettes',
      ogTitle: 'Mon Compte - Find The Finder',
      ogDescription: 'Gérer votre compte'
    },
    '/faq': {
      title: 'Questions Fréquemment Posées - Find The Finder',
      description: 'Réponses à toutes vos questions sur Find The Finder. Comment ça marche, sécurité et plus.',
      keywords: 'faq, questions fréquemment posées, aide, comment ça marche',
      ogTitle: 'FAQ - Find The Finder',
      ogDescription: 'Questions fréquemment posées répondues'
    },
    '/forgot_password': {
      title: 'Réinitialiser le Mot de Passe - Find The Finder',
      description: 'Mot de passe oublié ? Entrez votre adresse e-mail.',
      keywords: 'réinitialiser mot de passe, mot de passe oublié',
      ogTitle: 'Réinitialiser le Mot de Passe - Find The Finder',
      ogDescription: 'Réinitialiser votre mot de passe'
    },
    '/warning': {
      title: 'Avertissement - Find The Finder',
      description: 'Avertissements importants et informations de sécurité concernant l\'utilisation de Find The Finder.',
      keywords: 'avertissement, sécurité, conditions d\'utilisation',
      ogTitle: 'Avertissement - Find The Finder',
      ogDescription: 'Avertissements importants et informations de sécurité'
    }
  },
  es: {
    '/': {
      title: 'Find The Finder - Encuentra Tus Objetos Perdidos',
      description: 'La forma más fácil de encontrar tus objetos perdidos. Protege tus pertenencias con etiquetas QR.',
      keywords: 'objetos perdidos, etiqueta encontrada, código qr, etiqueta seguridad, teléfono perdido',
      ogTitle: 'Find The Finder - Encuentra Tus Objetos Perdidos',
      ogDescription: 'Protege tus objetos con etiquetas QR'
    },
    '/lost_found': {
      title: 'He Encontrado - Find The Finder',
      description: '¿Encontraste un objeto perdido? Escanea el código QR y ayuda a devolverlo a su dueño.',
      keywords: 'objeto encontrado, objeto perdido encontrado, escanear código qr, programa de recompensas',
      ogTitle: 'He Encontrado - Sistema de Devolución de Objetos Perdidos',
      ogDescription: 'Ayuda a devolver objetos perdidos a sus dueños'
    },
    '/sign_in': {
      title: 'Iniciar Sesión - Find The Finder',
      description: 'Inicia sesión en tu cuenta de Find The Finder. Gestiona tus etiquetas.',
      keywords: 'iniciar sesión, login cuenta, find the finder login',
      ogTitle: 'Find The Finder - Iniciar Sesión',
      ogDescription: 'Iniciar sesión en tu cuenta'
    },
    '/sign_up': {
      title: 'Registrarse - Find The Finder',
      description: 'Regístrate en Find The Finder. Crea una cuenta gratuita.',
      keywords: 'registrarse, crear cuenta, registro gratuito',
      ogTitle: 'Find The Finder - Registrarse',
      ogDescription: 'Crea tu cuenta gratuita'
    },
    '/account': {
      title: 'Mi Cuenta - Find The Finder',
      description: 'Gestiona tu información de cuenta y etiquetas.',
      keywords: 'gestión cuenta, perfil, gestión etiquetas',
      ogTitle: 'Mi Cuenta - Find The Finder',
      ogDescription: 'Gestionar tu cuenta'
    },
    '/faq': {
      title: 'Preguntas Frecuentes - Find The Finder',
      description: 'Respuestas a todas tus preguntas sobre Find The Finder. Cómo funciona, seguridad y más.',
      keywords: 'faq, preguntas frecuentes, ayuda, cómo funciona',
      ogTitle: 'FAQ - Find The Finder',
      ogDescription: 'Preguntas frecuentes respondidas'
    },
    '/forgot_password': {
      title: 'Restablecer Contraseña - Find The Finder',
      description: '¿Olvidaste tu contraseña? Ingresa tu dirección de correo electrónico.',
      keywords: 'restablecer contraseña, contraseña olvidada',
      ogTitle: 'Restablecer Contraseña - Find The Finder',
      ogDescription: 'Restablecer tu contraseña'
    },
    '/warning': {
      title: 'Advertencia - Find The Finder',
      description: 'Advertencias importantes e información de seguridad sobre el uso de Find The Finder.',
      keywords: 'advertencia, seguridad, términos de uso',
      ogTitle: 'Advertencia - Find The Finder',
      ogDescription: 'Advertencias importantes e información de seguridad'
    }
  },
  it: {
    '/': {
      title: 'Find The Finder - Trova I Tuoi Oggetti Smarriti',
      description: 'Il modo più semplice per trovare i tuoi oggetti smarriti. Proteggi i tuoi beni con etichette QR.',
      keywords: 'oggetti smarriti, etichetta trovata, codice qr, etichetta sicurezza, telefono smarrito',
      ogTitle: 'Find The Finder - Trova I Tuoi Oggetti Smarriti',
      ogDescription: 'Proteggi i tuoi oggetti con etichette QR'
    },
    '/lost_found': {
      title: 'Ho Trovato - Find The Finder',
      description: 'Hai trovato un oggetto smarrito? Scansiona il codice QR e aiuta a restituirlo al proprietario.',
      keywords: 'oggetto trovato, oggetto smarrito trovato, scansiona codice qr, programma premi',
      ogTitle: 'Ho Trovato - Sistema di Restituzione Oggetti Smarriti',
      ogDescription: 'Aiuta a restituire oggetti smarriti ai proprietari'
    },
    '/sign_in': {
      title: 'Accedi - Find The Finder',
      description: 'Accedi al tuo account Find The Finder. Gestisci le tue etichette.',
      keywords: 'accedi, login account, find the finder login',
      ogTitle: 'Find The Finder - Accedi',
      ogDescription: 'Accedi al tuo account'
    },
    '/sign_up': {
      title: 'Registrati - Find The Finder',
      description: 'Registrati a Find The Finder. Crea un account gratuito.',
      keywords: 'registrati, crea account, registrazione gratuita',
      ogTitle: 'Find The Finder - Registrati',
      ogDescription: 'Crea il tuo account gratuito'
    },
    '/account': {
      title: 'Il Mio Account - Find The Finder',
      description: 'Gestisci le informazioni del tuo account e le etichette.',
      keywords: 'gestione account, profilo, gestione etichette',
      ogTitle: 'Il Mio Account - Find The Finder',
      ogDescription: 'Gestisci il tuo account'
    },
    '/faq': {
      title: 'Domande Frequenti - Find The Finder',
      description: 'Risposte a tutte le tue domande su Find The Finder. Come funziona, sicurezza e altro.',
      keywords: 'faq, domande frequenti, aiuto, come funziona',
      ogTitle: 'FAQ - Find The Finder',
      ogDescription: 'Domande frequenti con risposta'
    },
    '/forgot_password': {
      title: 'Reimposta Password - Find The Finder',
      description: 'Password dimenticata? Inserisci il tuo indirizzo email.',
      keywords: 'reimposta password, password dimenticata',
      ogTitle: 'Reimposta Password - Find The Finder',
      ogDescription: 'Reimposta la tua password'
    },
    '/warning': {
      title: 'Avvertimento - Find The Finder',
      description: 'Avvertimenti importanti e informazioni sulla sicurezza riguardo l\'uso di Find The Finder.',
      keywords: 'avvertimento, sicurezza, termini di utilizzo',
      ogTitle: 'Avvertimento - Find The Finder',
      ogDescription: 'Avvertimenti importanti e informazioni sulla sicurezza'
    }
  },
  ru: {
    '/': {
      title: 'Find The Finder - Найдите Ваши Потерянные Вещи',
      description: 'Самый простой способ найти ваши потерянные вещи. Защитите ваши вещи QR этикетками.',
      keywords: 'потерянные вещи, найденная этикетка, qr код, этикетка безопасности, потерянный телефон',
      ogTitle: 'Find The Finder - Найдите Ваши Потерянные Вещи',
      ogDescription: 'Защитите ваши вещи QR этикетками'
    },
    '/lost_found': {
      title: 'Я Нашел - Find The Finder',
      description: 'Нашли потерянную вещь? Отсканируйте QR код и помогите вернуть владельцу.',
      keywords: 'нашел вещь, потерянная вещь найдена, сканировать qr код, программа вознаграждений',
      ogTitle: 'Я Нашел - Система Возврата Потерянных Вещей',
      ogDescription: 'Помогите вернуть потерянные вещи владельцам'
    },
    '/sign_in': {
      title: 'Войти - Find The Finder',
      description: 'Войдите в ваш аккаунт Find The Finder. Управляйте вашими этикетками.',
      keywords: 'войти, вход в аккаунт, find the finder логин',
      ogTitle: 'Find The Finder - Войти',
      ogDescription: 'Войти в ваш аккаунт'
    },
    '/sign_up': {
      title: 'Регистрация - Find The Finder',
      description: 'Зарегистрируйтесь в Find The Finder. Создайте бесплатный аккаунт.',
      keywords: 'регистрация, создать аккаунт, бесплатная регистрация',
      ogTitle: 'Find The Finder - Регистрация',
      ogDescription: 'Создайте ваш бесплатный аккаунт'
    },
    '/account': {
      title: 'Мой Аккаунт - Find The Finder',
      description: 'Управляйте информацией вашего аккаунта и этикетками.',
      keywords: 'управление аккаунтом, профиль, управление этикетками',
      ogTitle: 'Мой Аккаунт - Find The Finder',
      ogDescription: 'Управляйте вашим аккаунтом'
    },
    '/faq': {
      title: 'Часто Задаваемые Вопросы - Find The Finder',
      description: 'Ответы на все ваши вопросы о Find The Finder. Как это работает, безопасность и многое другое.',
      keywords: 'faq, часто задаваемые вопросы, помощь, как это работает',
      ogTitle: 'FAQ - Find The Finder',
      ogDescription: 'Ответы на часто задаваемые вопросы'
    },
    '/forgot_password': {
      title: 'Сброс Пароля - Find The Finder',
      description: 'Забыли пароль? Введите ваш email адрес.',
      keywords: 'сброс пароля, забыл пароль',
      ogTitle: 'Сброс Пароля - Find The Finder',
      ogDescription: 'Сбросить ваш пароль'
    },
    '/warning': {
      title: 'Предупреждение - Find The Finder',
      description: 'Важные предупреждения и информация о безопасности использования Find The Finder.',
      keywords: 'предупреждение, безопасность, условия использования',
      ogTitle: 'Предупреждение - Find The Finder',
      ogDescription: 'Важные предупреждения и информация о безопасности'
    }
  },
  gr: {
    '/': {
      title: 'Find The Finder - Βρείτε τα Χαμένα σας Αντικείμενα',
      description: 'Ο πιο εύκολος τρόπος να βρείτε τα χαμένα σας αντικείμενα. Προστατέψτε τα αντικείμενά σας με ετικέτες QR.',
      keywords: 'χαμένα αντικείμενα, ετικέτα βρέθηκε, qr κώδικας, ετικέτα ασφαλείας, χαμένο τηλέφωνο',
      ogTitle: 'Find The Finder - Βρείτε τα Χαμένα σας Αντικείμενα',
      ogDescription: 'Προστατέψτε τα αντικείμενά σας με ετικέτες QR'
    },
    '/lost_found': {
      title: 'Βρήκα - Find The Finder',
      description: 'Βρήκατε ένα χαμένο αντικείμενο; Σκανάρετε τον QR κώδικα και βοηθήστε να επιστραφεί στον κάτοχό του.',
      keywords: 'βρήκα αντικείμενο, χαμένο αντικείμενο βρέθηκε, σκανάρω qr κώδικα, πρόγραμμα ανταμοιβών',
      ogTitle: 'Βρήκα - Σύστημα Επιστροφής Χαμένων Αντικειμένων',
      ogDescription: 'Βοηθήστε να επιστραφούν χαμένα αντικείμενα στους κατόχους τους'
    },
    '/sign_in': {
      title: 'Σύνδεση - Find The Finder',
      description: 'Συνδεθείτε στον λογαριασμό σας Find The Finder. Διαχειριστείτε τις ετικέτες σας.',
      keywords: 'σύνδεση, είσοδος λογαριασμού, find the finder σύνδεση',
      ogTitle: 'Find The Finder - Σύνδεση',
      ogDescription: 'Συνδεθείτε στον λογαριασμό σας'
    },
    '/sign_up': {
      title: 'Εγγραφή - Find The Finder',
      description: 'Εγγραφείτε στο Find The Finder. Δημιουργήστε έναν δωρεάν λογαριασμό.',
      keywords: 'εγγραφή, δημιουργία λογαριασμού, δωρεάν εγγραφή',
      ogTitle: 'Find The Finder - Εγγραφή',
      ogDescription: 'Δημιουργήστε τον δωρεάν σας λογαριασμό'
    },
    '/account': {
      title: 'Ο Λογαριασμός μου - Find The Finder',
      description: 'Διαχειριστείτε τις πληροφορίες του λογαριασμού σας και τις ετικέτες.',
      keywords: 'διαχείριση λογαριασμού, προφίλ, διαχείριση ετικετών',
      ogTitle: 'Ο Λογαριασμός μου - Find The Finder',
      ogDescription: 'Διαχειριστείτε τον λογαριασμό σας'
    },
    '/faq': {
      title: 'Συχνές Ερωτήσεις - Find The Finder',
      description: 'Απαντήσεις σε όλες τις ερωτήσεις σας για το Find The Finder. Πώς λειτουργεί, ασφάλεια και άλλα.',
      keywords: 'faq, συχνές ερωτήσεις, βοήθεια, πώς λειτουργεί',
      ogTitle: 'FAQ - Find The Finder',
      ogDescription: 'Συχνές ερωτήσεις με απαντήσεις'
    },
    '/forgot_password': {
      title: 'Επαναφορά Κωδικού - Find The Finder',
      description: 'Ξεχάσατε τον κωδικό σας; Εισάγετε τη διεύθυνση email σας.',
      keywords: 'επαναφορά κωδικού, ξέχασα κωδικό',
      ogTitle: 'Επαναφορά Κωδικού - Find The Finder',
      ogDescription: 'Επαναφέρετε τον κωδικό σας'
    },
    '/warning': {
      title: 'Προειδοποίηση - Find The Finder',
      description: 'Σημαντικές προειδοποιήσεις και πληροφορίες ασφαλείας σχετικά με τη χρήση του Find The Finder.',
      keywords: 'προειδοποίηση, ασφάλεια, όροι χρήσης',
      ogTitle: 'Προειδοποίηση - Find The Finder',
      ogDescription: 'Σημαντικές προειδοποιήσεις και πληροφορίες ασφαλείας'
    }
  }
};

export function getSEOData(locale: string, pathname: string): SEOData | null {
  const localeConfig = seoConfig[locale];
  if (!localeConfig) return null;

  return localeConfig[pathname] || null;
}

export function generateCanonicalUrl(pathname: string, locale: string): string {
  const baseUrl = 'https://www.findthefinder.com';

  if (locale === 'tr') {
    return `${baseUrl}${pathname}`;
  }

  return `${baseUrl}/${locale}${pathname}`;
}

export function generateAlternateUrls(pathname: string): Array<{locale: string, url: string}> {
  const baseUrl = 'https://www.findthefinder.com';
  const locales = ['tr', 'en', 'de', 'fr', 'es', 'it', 'ru', 'gr'];

  return locales.map(locale => ({
    locale,
    url: locale === 'tr' ? `${baseUrl}${pathname}` : `${baseUrl}/${locale}${pathname}`
  }));
}
