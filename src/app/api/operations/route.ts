import { NextResponse } from 'next/server';
import { prisma } from '../../../../prisma/prisma-client';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email) {
        return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    try {
        const topUpOperations = await prisma.topUpOperations.findMany({
            where: { email },
        });

        const withdrawOperations = await prisma.withdrawOperations.findMany({
            where: { email },
        });

        // Объединяем оба массива и сортируем их по дате
        const allOperations = [
            ...topUpOperations.map(op => ({ ...op, type: 'topup' })),
            ...withdrawOperations.map(op => ({ ...op, type: 'withdraw' })),
        ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        return NextResponse.json(allOperations, { status: 200 });
    } catch (error) {
        console.error('Error fetching operations:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
