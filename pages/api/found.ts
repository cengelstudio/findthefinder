import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import sendEmail from '../../lib/sendMail';
import { mailContents } from '../../lib/emailContents';
import type { ApiResponse, FoundRequest, SupportedLang } from '../../types/api';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  try {
    const { code, email, phone, address, lang } = req.body as FoundRequest;

    const codeEntry = await prisma.code.findUnique({
      where: { content: code },
    });

    if (!codeEntry) {
      return res
        .status(404)
        .json({ status: 'not_found', message: 'Code not found.' });
    }

    // Save the finder's information
    await prisma.finder.create({
      data: {
        code,
        email,
        phone,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    if (codeEntry.user_id) {
      const codeAuthor = await prisma.user.findUnique({
        where: { id: codeEntry.user_id },
      });

      if (codeAuthor?.email) {
        const mapsLink = address
          ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              address
            )}`
          : null;
        const note = codeEntry.used_on || '(belirtilmemiş)';
        const selectedLang: SupportedLang = lang in mailContents ? lang : 'tr';
        const mailText = mailContents[selectedLang];

        const messageContent = mailText.found(
          email,
          phone,
          address,
          mapsLink,
          note
        );
        sendEmail(codeAuthor.email, mailText.subject_found, messageContent);

        if (codeAuthor.second_mail) {
          sendEmail(
            codeAuthor.second_mail,
            mailText.subject_found,
            messageContent
          );
        }

        // Send notification to the finder
        const congratsMessage = mailText.congrats();
        sendEmail(email, mailText.subject_congrats, congratsMessage);

        // BCC admin
        sendEmail(
          'metehansaral@gmail.com',
          mailText.subject_found,
          messageContent
        );
      }
    }

    return res.status(200).json({ status: 'ok' });
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ status: 'error', message: 'An internal server error occurred.' });
  }
}
