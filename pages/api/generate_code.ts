import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string | { status: string }>
) {
  // This part of the endpoint seems to be for generating a list of URLs from existing codes.
  try {
    const { startDate, endDate } = req.query;

    // Basic validation for query parameters
    if (typeof startDate !== 'string' || typeof endDate !== 'string') {
      return res.status(400).json({ status: 'error' });
    }

    const findAllCodes = await prisma.code.findMany({
      where: {
        created_at: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      },
    });

    const responseString = findAllCodes
      .map(c => `https://findthefinder.com/lost_found/${c.content},${c.content}`)
      .join('\n');

    res.setHeader('Content-Type', 'text/plain');
    return res.status(200).send(responseString);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ status: 'error' });
  }
}
