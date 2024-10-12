import {NextResponse} from "next/server";
import {prisma} from "../../../../prisma/prisma-client"; // Adjust the path to your Prisma client

export async function POST(req: Request) {
    try {
        const {login, method, amount, paymentDetails} = await req.json();

        const newWithdrawRequest = await prisma.withdrawRequest.create({
            data: {
                login,
                method,
                amount: +(amount),
                paymentDetails
            }
        });

        console.log(newWithdrawRequest)

        return NextResponse.json(newWithdrawRequest, {status: 200});
    } catch (err) {
        return NextResponse.json({error: 'Failed to create withdraw request'}, {status: 500});
    }
}

export async function GET(){
    const users = await prisma.withdrawRequest.findMany();
    return NextResponse.json(users);
}