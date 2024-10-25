import { NextResponse } from 'next/server';
import { prisma } from "../../../../../prisma/prisma-client";

export const POST = async (req: Request) => {
    const { requestId, amount, email } = await req.json();

    try {
        const request = await prisma.withdrawRequest.findUnique({
            where: { id: requestId },
        });

        if (!request) {
            return NextResponse.json({ error: 'Заявка не найдена' }, { status: 404 });
        }

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json({ error: 'Пользователь не найден' }, { status: 404 });
        }

        // Преобразование amount в Float
        const amountFloat = parseFloat(amount);

        if (isNaN(amountFloat)) {
            return NextResponse.json({ error: 'Неверная сумма' }, { status: 400 });
        }

        await prisma.withdrawOperations.create({
            data: {
                sum: amountFloat, // Храните значение как Float
                email: user.email,
            },
        });

        await prisma.withdrawRequest.delete({
            where: { id: requestId },
        });

        return NextResponse.json({ message: 'Заявка одобрена и баланс обновлен' }, { status: 200 });
    } catch (error) {
        console.error('Ошибка при одобрении заявки:', error);
        return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
    }
};
