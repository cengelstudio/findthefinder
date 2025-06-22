import type { SupportedLang } from '../types/api';

export const mailContents: Record<
  SupportedLang,
  {
    found: (
      email: string,
      phone: string,
      address: string,
      mapsLink: string | null,
      note: string
    ) => string;
    congrats: () => string;
    subject_found: string;
    subject_congrats: string;
  }
> = {
  tr: {
    found: (
      email: string,
      phone: string,
      address: string,
      mapsLink: string | null,
      note: string
    ) =>
      `Merhaba,\n\nEşyanız bulundu. Eşyanızı bulan kişinin iletişim bilgileri: ${email} ${phone}\n\nEşyanın bulunduğu konumu: ${
        address ? `${address}\n${mapsLink}` : 'Adres bilgisi mevcut değil.'
      }\n\nHatırlamak istenilen not: ${note}`,
    congrats: () =>
      `Bulduğunuz eşyayı sahibine teslim etmek için lütfen güvenceye alınız!\n\nEşyayı haklı nedenle teslim etmek istemez veya eşya sahibi ile bir anlaşmazlık yaşarsanız, resmi mercileri durumdan haberdar ediniz.\n\nBulduğunuz eşyaya ilişkin yaptığınız makul giderleri eşya sahibinden talep etmek hakkınız vardır.\n\nFind The Finder Team\nLütfen, bu iletiye cevap vermeyiniz!`,
    subject_found: 'Eşyanız Bulundu',
    subject_congrats: 'Tebrikler',
  },
  en: {
    found: (
      email: string,
      phone: string,
      address: string,
      mapsLink: string | null,
      note: string
    ) =>
      `Hello,\n\nYour item has been found. Contact details of the finder: ${email} ${phone}\n\nLocation where the item was found: ${
        address
          ? `${address}\n${mapsLink}`
          : 'No address information available.'
      }\n\nNote to remember: ${note}`,
    congrats: () =>
      `Please secure the item you found until you deliver it to its owner!\n\nIf you have a valid reason not to deliver the item or if you have a dispute with the owner, please inform the authorities.\n\nYou have the right to claim reasonable expenses related to the item from the owner.\n\nFind The Finder Team\nPlease do not reply to this email!`,
    subject_found: 'Lost Found',
    subject_congrats: 'Congratulations',
  },
  ru: {
    found: (
      email: string,
      phone: string,
      address: string,
      mapsLink: string | null,
      note: string
    ) =>
      `Здравствуйте,\n\nВаш предмет найден. Контактные данные нашедшего: ${email} ${phone}\n\nМесто, где был найден предмет: ${
        address
          ? `${address}\n${mapsLink}`
          : 'Информация об адресе отсутствует.'
      }\n\nПримечание: ${note}`,
    congrats: () =>
      `Пожалуйста, сохраните найденный предмет до передачи владельцу!\n\nЕсли вы не хотите отдавать предмет по уважительной причине или возник спор с владельцем, сообщите об этом властям.\n\nВы имеете право требовать разумные расходы, связанные с предметом, у владельца.\n\nFind The Finder Team\nПожалуйста, не отвечайте на это письмо!`,
    subject_found: 'Ваш предмет найден',
    subject_congrats: 'Поздравляем',
  },
  de: {
    found: (
      email: string,
      phone: string,
      address: string,
      mapsLink: string | null,
      note: string
    ) =>
      `Hallo,\n\nIhr Gegenstand wurde gefunden. Kontaktdaten des Finders: ${email} ${phone}\n\nFundort: ${
        address
          ? `${address}\n${mapsLink}`
          : 'Keine Adressinformationen verfügbar.'
      }\n\nHinweis: ${note}`,
    congrats: () =>
      `Bitte sichern Sie den gefundenen Gegenstand, bis Sie ihn dem Eigentümer übergeben!\n\nWenn Sie den Gegenstand aus berechtigtem Grund nicht übergeben möchten oder es zu Streitigkeiten mit dem Eigentümer kommt, informieren Sie bitte die Behörden.\n\nSie haben das Recht, angemessene Ausgaben im Zusammenhang mit dem Gegenstand vom Eigentümer zu verlangen.\n\nFind The Finder Team\nBitte antworten Sie nicht auf diese E-Mail!`,
    subject_found: 'Ihr Gegenstand wurde gefunden',
    subject_congrats: 'Glückwunsch',
  },
  fr: {
    found: (
      email: string,
      phone: string,
      address: string,
      mapsLink: string | null,
      note: string
    ) =>
      `Bonjour,\n\nVotre objet a été retrouvé. Coordonnées du trouveur : ${email} ${phone}\n\nLieu où l'objet a été trouvé : ${
        address
          ? `${address}\n${mapsLink}`
          : "Aucune information d'adresse disponible."
      }\n\nNote : ${note}`,
    congrats: () =>
      `Veuillez sécuriser l'objet trouvé jusqu'à ce que vous le remettiez à son propriétaire !\n\nSi vous ne souhaitez pas remettre l'objet pour une raison valable ou si vous avez un différend avec le propriétaire, veuillez en informer les autorités.\n\nVous avez le droit de réclamer des frais raisonnables liés à l'objet auprès du propriétaire.\n\nFind The Finder Team\nVeuillez ne pas répondre à cet e-mail !`,
    subject_found: 'Votre objet a été retrouvé',
    subject_congrats: 'Félicitations',
  },
  it: {
    found: (
      email: string,
      phone: string,
      address: string,
      mapsLink: string | null,
      note: string
    ) =>
      `Ciao,\n\nIl tuo oggetto è stato trovato. Dettagli di contatto del trovatore: ${email} ${phone}\n\nLuogo in cui è stato trovato l'oggetto: ${
        address
          ? `${address}\n${mapsLink}`
          : "Nessuna informazione sull'indirizzo disponibile."
      }\n\nNota: ${note}`,
    congrats: () =>
      `Si prega di mettere al sicuro l'oggetto trovato fino alla consegna al proprietario!\n\nSe non desideri consegnare l'oggetto per un motivo valido o se hai una controversia con il proprietario, informa le autorità.\n\nHai il diritto di richiedere al proprietario le spese ragionevoli sostenute per l'oggetto.\n\nFind The Finder Team\nSi prega di non rispondere a questa email!`,
    subject_found: 'Il tuo oggetto è stato trovato',
    subject_congrats: 'Congratulazioni',
  },
  es: {
    found: (
      email: string,
      phone: string,
      address: string,
      mapsLink: string | null,
      note: string
    ) =>
      `Hola,\n\nSu objeto ha sido encontrado. Datos de contacto del buscador: ${email} ${phone}\n\nLugar donde se encontró el objeto: ${
        address
          ? `${address}\n${mapsLink}`
          : 'No hay información de dirección disponible.'
      }\n\nNota: ${note}`,
    congrats: () =>
      `Por favor, asegure el objeto encontrado hasta que lo entregue a su propietario.\n\nSi no desea entregar el objeto por una razón válida o si tiene una disputa con el propietario, informe a las autoridades.\n\nTiene derecho a reclamar los gastos razonables relacionados con el objeto al propietario.\n\nFind The Finder Team\n¡Por favor, no responda a este correo electrónico!`,
    subject_found: 'Su objeto ha sido encontrado',
    subject_congrats: 'Felicidades',
  },
  gr: {
    found: (
      email: string,
      phone: string,
      address: string,
      mapsLink: string | null,
      note: string
    ) =>
      `Γεια σας,\n\nΤο αντικείμενό σας βρέθηκε. Στοιχεία επικοινωνίας του ευρέτη: ${email} ${phone}\n\nΤοποθεσία όπου βρέθηκε το αντικείμενο: ${
        address
          ? `${address}\n${mapsLink}`
          : 'Δεν υπάρχουν διαθέσιμες πληροφορίες διεύθυνσης.'
      }\n\nΣημείωση: ${note}`,
    congrats: () =>
      `Παρακαλούμε ασφαλίστε το αντικείμενο που βρήκατε μέχρι να το παραδώσετε στον ιδιοκτήτη του!\n\nΕάν δεν θέλετε να παραδώσετε το αντικείμενο για βάσιμο λόγο ή εάν έχετε διαφωνία με τον ιδιοκτήτη, ενημερώστε τις αρχές.\n\nΈχετε το δικαίωμα να ζητήσετε εύλογα έξοδα που σχετίζονται με το αντικείμενο από τον ιδιοκτήτη.\n\nFind The Finder Team\nΠαρακαλούμε μην απαντήσετε σε αυτό το email!`,
    subject_found: 'Το αντικείμενό σας βρέθηκε',
    subject_congrats: 'Συγχαρητήρια',
  },
};

export const forgotPasswordMailContents: Record<
  SupportedLang,
  { subject: string; body: (password: string) => string }
> = {
  tr: {
    subject: 'Şifre Sıfırlama',
    body: (password: string) =>
      `Merhaba,\n\nŞifreniz başarıyla sıfırlandı, sisteme giriş yapmak için yeni şifreniz: ${password}`,
  },
  en: {
    subject: 'Password Reset',
    body: (password: string) =>
      `Hello,\n\nYour password has been reset successfully. Your new password to log in: ${password}`,
  },
  ru: {
    subject: 'Сброс пароля',
    body: (password: string) =>
      `Здравствуйте,\n\nВаш пароль был успешно сброшен. Ваш новый пароль для входа: ${password}`,
  },
  de: {
    subject: 'Passwort zurücksetzen',
    body: (password: string) =>
      `Hallo,\n\nIhr Passwort wurde erfolgreich zurückgesetzt. Ihr neues Passwort zum Einloggen: ${password}`,
  },
  fr: {
    subject: 'Réinitialisation du mot de passe',
    body: (password: string) =>
      `Bonjour,\n\nVotre mot de passe a été réinitialisé avec succès. Votre nouveau mot de passe pour vous connecter : ${password}`,
  },
  it: {
    subject: 'Reimpostazione della password',
    body: (password: string) =>
      `Ciao,\n\nLa tua password è stata reimpostata con successo. La tua nuova password per accedere: ${password}`,
  },
  es: {
    subject: 'Restablecimiento de contraseña',
    body: (password: string) =>
      `Hola,\n\nSu contraseña ha sido restablecida con éxito. Su nueva contraseña para iniciar sesión: ${password}`,
  },
  gr: {
    subject: 'Επαναφορά κωδικού πρόσβασης',
    body: (password: string) =>
      `Γεια σας,\n\nΟ κωδικός πρόσβασής σας επαναφέρθηκε με επιτυχία. Ο νέος σας κωδικός για σύνδεση: ${password}`,
  },
};
