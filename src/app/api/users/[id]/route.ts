import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma-client";


export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    try {
        const deletedUser = await prisma.user.delete({
            where: {
                id: Number(id),
            },
        });

        return NextResponse.json(deletedUser);
    } catch (error) {
        return NextResponse.json({ message: "Error deleting user", error }, { status: 500 });
    }
}