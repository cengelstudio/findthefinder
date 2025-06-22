import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import md5 from 'md5';
import type { ApiResponse, LoginRequest } from '../../../types/api';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  const { email, password } = req.body as LoginRequest;

  const authControl = await prisma.user.findMany({
    where: {
      email: email,
      password: md5(password!),
    },
  });

  if (authControl.length !== 0) {
    return res.status(200).json({
      auth: true,
      token: `${authControl[0].id}:${authControl[0].email}`,
    });
  }

  return res.status(200).json({
    auth: false,
  });
}
