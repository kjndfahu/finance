import { NextApiRequest, NextApiResponse } from 'next';
import {prisma} from "../../../../prisma/prisma-client";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    const { name, details } = req.body;

    if (req.method === 'PUT') {
        try {
            const updatedDetail = await prisma.bankingDetails.update({
                where: { id: Number(id) },
                data: { name, details },
            });
            res.status(200).json(updatedDetail);
        } catch (error) {
            res.status(500).json({ error: 'Unable to update banking details' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}