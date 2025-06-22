import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import type {
  ApiResponse,
  SessionRequest,
  SessionData,
} from '../../../types/api';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<{ data?: SessionData }>>
) {
  try {
    const { get } = req.body as SessionRequest;

    if (!get || get.split(':').length < 2) {
      return res.status(401).json({ auth: false, status: 'unauthorized' });
    }

    const userId = BigInt(get.split(':')[0]);
    const userEmail = get.split(':')[1];

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
        email: userEmail,
      },
    });

    if (user) {
      const userCodes = await prisma.code.findMany({
        where: { user_id: user.id },
      });

      const codes = userCodes.map(code => ({
        id: Number(code.id),
        content: code.content,
        used_on: code.used_on,
      }));

      const sessionData: SessionData = {
        number: user.phone,
        email: user.email,
        secondMail: user.second_mail,
        codes: codes,
      };

      return res.status(200).json({
        auth: true,
        data: sessionData,
      });
    } else {
      return res.status(401).json({ auth: false, status: 'unauthorized' });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ auth: false, status: 'error', message: 'Internal Server Error' });
  }
}
