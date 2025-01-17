import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma-client";

async function sendTelegramNotification(message: string) {
    const telegramBotToken = '7128023388:AAGOmem_1REoFTY6klqMGNk9XsjyLJsAjOw';
    const chatId = '@alliancereqiestbot';
    const telegramApiUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;

    try {
        const response = await fetch(telegramApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
            }),
        });

        const data = await response.json();
        console.log('Telegram API response:', data);

        if (!data.ok) {
            console.error('Telegram API Error:', data);
        }
    } catch (error) {
        console.error('Failed to send Telegram notification:', error);
    }
}

export async function POST(req: Request) {
    try {
        const { email, method, amount, paymentDetails } = await req.json();

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json({ error: 'Пользователь не найден' }, { status: 404 });
        }

        if (user.balance < amount) {
            return NextResponse.json({ error: 'Недостаточно средств на балансе' }, { status: 400 });
        }

        const newWithdrawRequest = await prisma.withdrawRequest.create({
            data: {
                email,
                method,
                amount: +(amount),
                paymentDetails,
            },
        });

        const newWithdrawOperation = await prisma.withdrawOperations.create({
            data: {
                email,
                sum: +(amount),
                status: "INPROCESSING",
            },
        });

        await prisma.user.update({
            where: { email },
            data: { balance: user.balance - amount },
        });

        console.log(newWithdrawRequest);
        console.log(newWithdrawOperation);

        const message = `Новый запрос на вывод:\nEmail: ${email}\nТип: ${method}\nАдрес: ${paymentDetails}\nСумма: ${amount}`;
        await sendTelegramNotification(message);

        return NextResponse.json(newWithdrawRequest, { status: 200 });
    } catch (err) {
        console.error('Ошибка при создании запроса на вывод:', err);
        return NextResponse.json({ error: 'Failed to create withdraw request' }, { status: 500 });
    }
}

export async function GET() {
    const users = await prisma.withdrawRequest.findMany();
    return NextResponse.json(users);
}
