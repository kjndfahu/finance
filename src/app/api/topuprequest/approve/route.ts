import { NextApiRequest, NextApiResponse } from 'next';
import {prisma} from "../../../../../prisma/prisma-client";


export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { sum, userId } = req.body;

        if (!sum || !userId) {
            return res.status(400).json({ error: 'Missing sum or userId' });
        }

        try {
            const topUpOperation = await prisma.topUpOperations.create({
                data: {
                    sum: parseInt(sum),
                    userId: parseInt(userId),
                },
            });

            return res.status(200).json(topUpOperation);
        } catch (error) {
            console.error('Error approving top-up request:', error);
            return res.status(500).json({ error: 'Server error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}