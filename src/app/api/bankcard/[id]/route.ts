import { prisma } from "../../../../../prisma/prisma-client";

export async function PUT(req: Request) {
    // Извлекаем id из URL
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop(); // Получаем последний сегмент URL как id

    // Проверяем, был ли id передан
    if (!id || isNaN(Number(id))) {
        return new Response(JSON.stringify({ error: 'Id is required and must be a number' }), {
            status: 400,
        });
    }

    try {
        // Получаем данные из тела запроса
        const { name, details } = await req.json();

        // Проверяем наличие необходимых полей
        if (!name || !details) {
            return new Response(JSON.stringify({ error: 'Name and details are required' }), {
                status: 400,
            });
        }

        // Обновляем данные в базе
        const updatedDetail = await prisma.bankingDetails.update({
            where: { id: Number(id) },
            data: { name, details },
        });

        // Возвращаем обновленные данные
        return new Response(JSON.stringify(updatedDetail), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error(error); // Выводим ошибку в консоль для отладки
        return new Response(JSON.stringify({ error: 'Unable to update banking details' }), {
            status: 500,
        });
    }
}
