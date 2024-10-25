import { prisma } from "../../../../../prisma/prisma-client";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    try {
        const { requestId, email, amount } = await req.json();

        // 1. Найти заявку на вывод по requestId
        const withdrawRequest = await prisma.withdrawRequest.findUnique({
            where: { id: requestId }
        });

        if (!withdrawRequest) {
            return NextResponse.json({ message: 'Заявка не найдена' }, { status: 404 });
        }

        // 2. Найти пользователя по email
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return NextResponse.json({ message: 'Пользователь не найден' }, { status: 404 });
        }

        // 3. Обновить баланс пользователя
        await prisma.user.update({
            where: { email },
            data: { balance: user.balance + amount }
        });

        // 4. Создать запись в таблице withdrawDeclined
        await prisma.withdrawDeclined.create({
            data: {
                sum: parseFloat(amount),
                email: user.email
            }
        });

        await prisma.withdrawOperations.create({
            data: {
                sum: parseFloat(amount),
                email: user.email,
                status: "REJECTED"
            }
        });

        // 5. Удалить заявку на вывод
        await prisma.withdrawRequest.delete({
            where: { id: requestId }
        });

        return NextResponse.json({ message: 'Заявка отклонена и удалена' }, { status: 200 });
    } catch (error) {
        console.error('Ошибка при обработке отклонения заявки:', error);
        return NextResponse.json({ message: 'Ошибка сервера при отклонении заявки' }, { status: 500 });
    }
};
