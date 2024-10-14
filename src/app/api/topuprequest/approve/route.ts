import { NextResponse } from 'next/server';
import { prisma } from '../../../../../prisma/prisma-client';

export async function POST(req: Request) {

    const { sum, email, requestId } = await req.json();
    if (!sum || !email || !requestId) {
        return NextResponse.json({ error: 'Missing sum, email, or requestId' }, { status: 400 });
    }

    try {

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }


        const topUpOperation = await prisma.topUpOperations.create({
            data: {
                sum: parseInt(sum),
                email: user.email,
            },
        });

        const updatedUser = await prisma.user.update({
            where: { email: user.email },
            data: {
                balance: user.balance + parseInt(sum),
            },
        });

        await prisma.topUpRequest.delete({
            where: { id: requestId },
        });

        // Возврат успешного ответа
        return NextResponse.json({ message: 'Top-up approved and balance updated successfully', topUpOperation, updatedUser }, { status: 200 });
    } catch (error) {
        console.error('Error approving top-up request:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
