import { prisma } from "../../../../../prisma/prisma-client";
import {NextResponse} from "next/server";

export const POST = async (req: Request) => {
    try {
        const { email, amount } = await req.json();
        await prisma.withdrawRequest.deleteMany({
            where: {
                email: email,
                amount: amount,
            },
        });

        return NextResponse.json({ message: 'Заявка отклонена и удалена' },{status: 200} )
    } catch (error) {
        console.error('Ошибка при удалении заявки:', error);
        return NextResponse.json({ message: 'Ошибка сервера при удалении заявки' },{status: 500} )
    }
};
