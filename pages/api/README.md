# API Routes - GitHub Pages Limitation

⚠️ **Önemli**: GitHub Pages static hosting hizmeti olduğu için API route'lar çalışmaz.

## Static Export Modunda Çalışmayan API'lar

Bu klasördeki tüm API endpoint'leri development ve production server ortamlarında çalışır, ancak GitHub Pages'da çalışmaz:

- `/api/found`
- `/api/generate_code`
- `/api/label_control`
- `/api/send_message`
- `/api/sitemap.xml`
- `/api/users/*`

## Alternatif Çözümler

GitHub Pages'da API fonksiyonalitesi için:

1. **Serverless Functions**: Vercel, Netlify gibi platformlar
2. **External API**: Backend servisini ayrı bir platformda host etme
3. **Client-side**: Formu doğrudan email/form servislere gönderme
4. **Hybrid**: Static site + external API kombinasyonu

## Development vs Production

- **Development** (`npm run dev`): Tüm API'lar çalışır
- **Production** (server): Tüm API'lar çalışır
- **GitHub Pages** (static): API'lar çalışmaz, sadece static dosyalar

Bu nedenle GitHub Pages versiyonunda form submission'lar çalışmayacaktır.
