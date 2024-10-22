import { NextResponse } from 'next/server';
import {prisma} from "../../../../prisma/prisma-client";


export async function POST(req: Request) {
    try {
        const { isSystem } = await req.json();

        if (!isSystem) {
            return NextResponse.json({ error: 'isSystem parameter is required' }, { status: 400 });
        }

        // Поиск записи в таблице bankingDetails по полю name
        const bankingDetail = await prisma.bankingDetails.findFirst({
            where: { name: isSystem },
        });

        if (!bankingDetail) {
            return NextResponse.json({ error: 'Banking details not found' }, { status: 404 });
        }

        // Возвращаем поле details найденной записи
        return NextResponse.json({ details: bankingDetail.details }, { status: 200 });
    } catch (error) {
        console.error('Error fetching banking details:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
export async function GET() {
    try {
        const details = await prisma.bankingDetails.findMany();
        return NextResponse.json(details);
    } catch (error) {
        console.error('Error fetching banking details:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}