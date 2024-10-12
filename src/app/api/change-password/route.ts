import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../prisma/prisma-client';
import bcrypt from 'bcrypt';

export async function PUT(req: NextApiRequest, res: NextApiResponse)  {
    console.log('Request method:', req.method); // Логирование метода запроса

    if (req.method !== 'PUT') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { email, currentPassword, newPassword } = req.body;

    if (!email || !currentPassword || !newPassword) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Incorrect current password' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        console.log(typeof hashedPassword, '111')

        await prisma.user.update({
            where: { email },
            data: { password: hashedPassword },
        });

        return res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error updating password:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
