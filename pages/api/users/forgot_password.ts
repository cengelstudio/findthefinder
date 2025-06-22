import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import md5 from 'md5';
import sendEmail from '../../../lib/sendMail';
import { forgotPasswordMailContents } from '../../../lib/emailContents';
import type {
  ApiResponse,
  ForgotPasswordRequest,
  SupportedLang,
} from '../../../types/api';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  try {
    const { email, lang } = req.body as ForgotPasswordRequest;

    const user = await prisma.user.findFirst({
      where: { email: email },
    });

    if (user) {
      const newPassword = Math.random().toString(36).slice(-8); // Generate a random 8-char password
      const selectedLang: SupportedLang =
        lang in forgotPasswordMailContents ? lang : 'tr';
      const mailText = forgotPasswordMailContents[selectedLang];
      const messageContent = mailText.body(newPassword);

      await prisma.user.update({
        where: { id: user.id },
        data: { password: md5(newPassword) },
      });

      sendEmail(email, mailText.subject, messageContent);

      return res.status(200).json({ status: 'ok' });
    }

    return res
      .status(404)
      .json({ status: 'not_found', message: 'User not found.' });
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ status: 'error', message: 'An internal server error occurred.' });
  }
}
