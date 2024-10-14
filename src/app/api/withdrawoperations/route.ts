import { NextResponse } from 'next/server';
import {prisma} from "../../../../prisma/prisma-client";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email'); // Получаем email из query параметров

    if (!email) {
        return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    try {
        const operations = await prisma.withdrawOperations.findMany({
            where: { email },
        });

        return NextResponse.json(operations, { status: 200 });
    } catch (error) {
        console.error('Error fetching top-up operations:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
