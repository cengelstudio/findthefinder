import type { NextApiRequest, NextApiResponse } from 'next';
import sendEmail from '../../lib/sendMail';
import type { ApiResponse, SendMessageRequest } from '../../types/api';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  try {
    const { name, email, phone, message } = req.body as SendMessageRequest;

    if (name && email && message) {
      const messageContent = `${name} adlı kişiden yeni bir mesaj var. \n\nİletişim Bilgileri:\nE-Mail: ${email}\nTelefon: ${phone}\n\nMesaj:\n\n${message}`;
      sendEmail('ozgurmericturan@gmail.com', 'Yeni Mesaj', messageContent);
      sendEmail('metehansaral@gmail.com', 'Yeni Mesaj', messageContent);

      return res.status(200).json({
        status: 'ok',
      });
    }

    return res.status(400).json({
      status: 'error',
      message: 'All fields are required.',
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      status: 'error',
      message: 'An internal server error occurred.',
    });
  }
}
