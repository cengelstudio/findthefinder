import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import md5 from 'md5';
import type { ApiResponse, SignUpRequest } from '../../../types/api';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  try {
    const {
      code,
      codeDescription,
      email,
      phone,
      password,
      rePassword,
      secondMail,
    } = req.body as SignUpRequest;

    if (password === rePassword) {
      const emailControl = await prisma.user.findMany({ where: { email } });
      console.log(email);

      if (emailControl.length === 0) {
        const codeControl = await prisma.code.findMany({
          where: { content: code },
        });

        if (codeControl.length !== 0) {
          const addUser = await prisma.user.create({
            data: {
              email,
              phone,
              second_mail: secondMail,
              password: md5(password),
              created_at: new Date(),
              updated_at: new Date(),
            },
          });

          await prisma.code.update({
            where: { content: code },
            data: {
              user_id: addUser.id,
              activated_at: new Date(),
              used_on: codeDescription,
            },
          });

          return res.status(200).json({
            status: 'added',
            token: `${addUser.id}:${email}`,
          });
        } else {
          return res.status(200).json({
            status: 'code',
          });
        }
      } else {
        return res.status(200).json({
          status: 'email',
        });
      }
    }

    return res.status(200).json({
      status: 'password',
    });
  } catch (e) {
    return res.status(200).json({
      status: 'system',
    });
  }
}
