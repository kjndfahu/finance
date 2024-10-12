import {prisma} from "../../../../prisma/prisma-client";
import {NextResponse} from "next/server";

export async function PATCH(req: Request) {
    try {
        const {email, amount} = await req.json();
        if (!email || !amount) {
            return NextResponse.json({message: 'Email and amount are required'}, {status: 400});
        }
        const user = await prisma.user.findUnique({
            where: {email},
        });
        if (!user) {
            return NextResponse.json({message: 'User not found'}, {status: 404});
        }
        if(user.balance < amount){
            return NextResponse.json({message: 'Balance is to low'}, {status: 404});
        }
        const updatedUser = await prisma.user.update({
            where: {email},
            data: {
                balance: user.balance - amount,
            },
        });
        return NextResponse.json(updatedUser);
    } catch (err) {
        console.error('Error updating balance:', err);
        return NextResponse.json({message: 'Failed to update balance'}, {status: 500});
    }
}