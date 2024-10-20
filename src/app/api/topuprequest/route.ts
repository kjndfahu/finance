import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma-client";

async function sendTelegramNotification(message: string) {
    const telegramBotToken = '7128023388:AAGOmem_1REoFTY6klqMGNk9XsjyLJsAjOw'; // Замените на ваш токен
    const chatId = '@alliancereqiestbot'; // Замените на ваш чат ID
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

        const data = await response.json(); // Получаем JSON ответ от Telegram API
        console.log('Telegram API response:', data); // Логируем ответ

        // Проверка на успех отправки сообщения
        if (!data.ok) {
            console.error('Telegram API Error:', data);
        }
    } catch (error) {
        console.error('Failed to send Telegram notification:', error);
    }
}


export async function POST(req: Request) {
    try {
        const { email, type, sum } = await req.json();

        if (!email || !type || !sum) {
            return NextResponse.json({ message: 'Invalid data provided' }, { status: 400 });
        }

        const newRequest = await prisma.topUpRequest.create({
            data: {
                email,
                type,
                sum: Number(sum),
            },
        });

        const message = `Новый запрос на пополнение:\nEmail: ${email}\nТип: ${type}\nСумма: ${sum}`;
        await sendTelegramNotification(message);


        return NextResponse.json(newRequest, { status: 200 });
    } catch (error) {
        console.error('Error creating top-up request:', error);
        return NextResponse.json({ message: 'Error processing request' }, { status: 500 });
    }
}

export async function GET() {
    const users = await prisma.topUpRequest.findMany();
    return NextResponse.json(users);
}
