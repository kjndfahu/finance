import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../prisma/prisma-client';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        const { name } = req.query;

        // Проверка на корректность типа параметра name
        if (typeof name !== 'string') {
            return res.status(400).json({ error: 'Invalid name parameter' });
        }

        try {
            const bankingDetail = await prisma.bankingDetails.findUnique({
                where: { name },
                select: { details: true }, 
            });

            if (!bankingDetail) {
                return res.status(404).json({ error: 'Banking details not found' });
            }

            return res.status(200).json(bankingDetail);
        } catch (error) {
            console.error('Error fetching banking details:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        return res.status(405).json({ error: 'Method not allowed' });
    }
};

export default handler;