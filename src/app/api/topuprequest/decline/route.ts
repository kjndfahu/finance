import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma-client";

export async function DELETE(req: Request) {
    try {
        const { requestId } = await req.json();

        if (!requestId) {
            return NextResponse.json({ message: 'Invalid request ID' }, { status: 400 });
        }

        await prisma.topUpRequest.delete({
            where: { id: Number(requestId) },
        });

        return NextResponse.json({ message: 'Request deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error processing rejection:', error);
        return NextResponse.json({ message: 'Error processing rejection' }, { status: 500 });
    }
}