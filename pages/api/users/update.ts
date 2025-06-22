import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, user } from '@prisma/client';
import md5 from 'md5';
import type { ApiResponse, UpdateRequest } from '../../../types/api';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  try {
    const {
      get,
      newCode,
      newCodeDesc,
      email,
      secondMail,
      phone,
      password,
      rePassword,
    } = req.body as UpdateRequest;

    if (get && get.split(':').length !== 0) {
      const userId = BigInt(get.split(':')[0]);

      let data: Partial<user> = {
        email: email,
        phone: phone,
        second_mail: secondMail,
      };

      if (password && password.length !== 0) {
        if (password === rePassword) {
          data.password = md5(password);
        } else {
          return res
            .status(400)
            .json({ status: 'error', message: 'Passwords do not match' });
        }
      }

      if (newCode && newCode.length !== 0) {
        await prisma.code.update({
          where: { content: newCode },
          data: {
            user_id: userId,
            used_on: newCodeDesc,
            activated_at: new Date(),
          },
        });
      }

      const updatedUser = await prisma.user.update({
        where: {
          id: userId,
        },
        data,
      });

      return res.status(200).json({
        status: 'updated',
        token: `${updatedUser.id}:${updatedUser.email}`,
      });
    } else {
      return res.status(401).json({ status: 'unauthorized' });
    }
  } catch (e) {
    return res
      .status(500)
      .json({ status: 'error', message: 'An internal server error occurred.' });
  }
}
