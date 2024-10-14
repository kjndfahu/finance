import {prisma} from "../../../../../prisma/prisma-client";
import {NextResponse} from "next/server";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    try {
        const deletedDeposit = await prisma.deposits.delete({
            where: {
                id: Number(id),
            },
        });

        return NextResponse.json(deletedDeposit);
    } catch (error) {
        return NextResponse.json({ message: "Error deleting user", error }, { status: 500 });
    }
}