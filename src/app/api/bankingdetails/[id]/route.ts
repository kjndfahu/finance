import { NextResponse } from 'next/server';
import { prisma } from '../../../../../prisma/prisma-client'; // Убедитесь, что путь корректный

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        // Получаем данные из тела запроса
        const { name, details } = await req.json();

        // Проверка на наличие необходимых данных
        if (!name || !details) {
            return NextResponse.json({ error: 'Name and details are required' }, { status: 400 });
        }

        // Проверяем наличие записи с указанным id
        const existingDetail = await prisma.bankingDetails.findUnique({
            where: { id: Number(id) },
        });

        if (!existingDetail) {
            return NextResponse.json({ error: 'Detail not found' }, { status: 404 });
        }

        // Обновляем запись в базе данных
        const updatedDetail = await prisma.bankingDetails.update({
            where: { id: Number(id) },
            data: {
                name,
                details,
            },
        });

        // Возвращаем обновленную запись
        return NextResponse.json(updatedDetail, { status: 200 });
    } catch (error) {
        console.error('Error updating banking details:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
