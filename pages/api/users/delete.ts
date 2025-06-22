import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import type { ApiResponse, DeleteRequest } from '../../../types/api';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  try {
    const { get } = req.body as DeleteRequest;

    if (get && get.split(':').length > 1) {
      const userId = BigInt(get.split(':')[0]);
      const userEmail = get.split(':')[1];

      const authControl = await prisma.user.findFirst({
        where: {
          id: userId,
          email: userEmail,
        },
      });

      if (authControl) {
        await prisma.code.updateMany({
          where: {
            user_id: userId,
          },
          data: {
            user_id: null,
          },
        });

        await prisma.user.delete({
          where: {
            id: userId,
          },
        });

        return res.status(200).json({
          status: 'deleted',
        });
      } else {
        return res.status(404).json({ status: 'not_found' });
      }
    }

    return res
      .status(400)
      .json({ status: 'error', message: 'Invalid request body.' });
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ status: 'error', message: 'An internal server error occurred.' });
  }
}
