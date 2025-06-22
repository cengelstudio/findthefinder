import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import type { ApiResponse, LabelControlRequest } from '../../types/api';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<{ have: boolean }>>
) {
  try {
    const { get } = req.body as LabelControlRequest;

    const codeControl = await prisma.code.findUnique({
      where: { content: get },
    });

    const have = !!(codeControl && codeControl.user_id !== null);

    return res.status(200).json({ status: 'ok', have });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      status: 'error',
      have: false,
    });
  }
}
