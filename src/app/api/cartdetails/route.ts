import {prisma} from "../../../../prisma/prisma-client";
import {NextResponse} from "next/server";

export async function GET(){
    const details = await prisma.bankingDetails.findMany();
    return NextResponse.json(details);
}