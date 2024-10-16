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

        if (user.balance < amount) {
            return NextResponse.json({ error: 'Недостаточно средств на балансе' }, { status: 400 });
        }

        await prisma.withdrawOperations.create({
            data: {
                sum: parseInt(amount),
                email: user.email,
            },
        });

        await prisma.user.update({
            where: { email },
            data: { balance: user.balance - amount },
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
