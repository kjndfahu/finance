// import { NextResponse } from "next/server";
// import { prisma } from "../../../../../prisma/prisma-client";
//
// export async function DELETE(req: Request) {
//     try {
//         const { requestId } = await req.json();
//
//         if (!requestId) {
//             return NextResponse.json({ message: 'Invalid request ID' }, { status: 400 });
//         }
//
//         // Удаляем запись о пополнении по идентификатору requestId
//         await prisma.topUpRequest.delete({
//             where: { id: requestId }, // Используем id для удаления
//         });
//
//         return NextResponse.json({ message: 'Request deleted successfully' }, { status: 200 });
//     } catch (error) {
//         console.error('Error processing rejection:', error);
//         return NextResponse.json({ message: 'Error processing rejection' }, { status: 500 });
//     }
// }
import { prisma } from "../../../../../prisma/prisma-client";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    try {
        const { requestId, email, sum } = await req.json();

        // 1. Найти заявку на вывод по requestId
        const withdrawRequest = await prisma.topUpRequest.findUnique({
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


        // 4. Создать запись в таблице withdrawDeclined
        await prisma.topUpDeclined.create({
            data: {
                sum: parseInt(sum),
                email: user.email
            }
        });

        await prisma.topUpOperations.create({
            data: {
                sum: parseInt(sum),
                email: user.email,
                status: "REJECTED"
            }
        });

        // 5. Удалить заявку на вывод
        await prisma.topUpRequest.delete({
            where: { id: requestId }
        });

        return NextResponse.json({ message: 'Заявка отклонена и удалена' }, { status: 200 });
    } catch (error) {
        console.error('Ошибка при обработке отклонения заявки:', error);
        return NextResponse.json({ message: 'Ошибка сервера при отклонении заявки' }, { status: 500 });
    }
};
