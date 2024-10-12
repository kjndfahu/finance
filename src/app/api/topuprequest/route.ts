
import { NextResponse } from "next/server";
import {prisma} from "../../../../prisma/prisma-client";

export async function POST(req: Request) {
    try {
        const { email, type, sum } = await req.json();
        
        if (!email || !type || !sum) {
            return NextResponse.json({ message: 'Invalid data provided' }, { status: 400 });
        }

        const newRequest = await prisma.topUpRequest.create({
            data: {
                email,
                type,
                sum: Number(sum),
            },
        });

        return NextResponse.json(newRequest, { status: 200 });
    } catch (error) {
        console.error('Error creating top-up request:', error);
        return NextResponse.json({ message: 'Error processing request' }, { status: 500 });
    }
}

export async function GET(){
    const users = await prisma.topUpRequest.findMany();
    return NextResponse.json(users);
}