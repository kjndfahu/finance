import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma-client";

export async function DELETE(req: Request) {
    try {
        const { requestId } = await req.json();

        if (!requestId) {
            return NextResponse.json({ message: 'Invalid request ID' }, { status: 400 });
        }

        // Удаляем запись о пополнении по идентификатору requestId
        await prisma.topUpRequest.delete({
            where: { id: requestId }, // Используем id для удаления
        });

        return NextResponse.json({ message: 'Request deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error processing rejection:', error);
        return NextResponse.json({ message: 'Error processing rejection' }, { status: 500 });
    }
}
