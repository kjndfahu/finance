import { NextResponse } from 'next/server';
import { prisma } from '../../../../prisma/prisma-client';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const login = searchParams.get('login');

    if (!login) {
        return NextResponse.json({ message: 'Invalid login parameter' }, { status: 400 });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { login },
        });

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.error('Error fetching user:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}