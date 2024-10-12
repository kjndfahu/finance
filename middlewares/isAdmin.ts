import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export const isAdmin = async (req: NextApiRequest, res: NextApiResponse, next: Function) => {
    const session = await getSession({ req });

    if (!session || session?.user.role !== 'ADMIN') {
        return res.status(403).json({ message: 'Access denied, only admins can perform this action' });
    }

    next();
};