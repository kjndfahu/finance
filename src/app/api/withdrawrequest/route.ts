import {NextResponse} from "next/server";
import {prisma} from "../../../../prisma/prisma-client";

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
        const {email, method, amount, paymentDetails} = await req.json();

        const newWithdrawRequest = await prisma.withdrawRequest.create({
            data: {
                email,
                method,
                amount: +(amount),
                paymentDetails
            }
        });

        console.log(newWithdrawRequest)

        const message = `Новый запрос на вывод:\nEmail: ${email}\nТип: ${method}\nАдрес: ${paymentDetails}\nСумма: ${amount}`;
        await sendTelegramNotification(message);

        return NextResponse.json(newWithdrawRequest, {status: 200});
    } catch (err) {
        return NextResponse.json({error: 'Failed to create withdraw request'}, {status: 500});
    }
}

export async function GET(){
    const users = await prisma.withdrawRequest.findMany();
    return NextResponse.json(users);
}