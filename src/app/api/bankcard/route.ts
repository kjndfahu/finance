import { prisma } from '../../../../prisma/prisma-client';

export const POST = async (req: Request) => {
    console.log('Request Method:', req.method); // Логирование метода
    const body = await req.json(); // Извлекаем тело запроса
    console.log('Request Body:', body); // Логирование тела запроса

    const { isSystem } = body;

    if (!isSystem) {
        return new Response(JSON.stringify({ error: 'isSystem is required' }), { status: 400 });
    }

    try {
        const bankingDetail = await prisma.bankingDetails.findFirst({
            where: { name: isSystem },
            select: { details: true },
        });

        if (!bankingDetail) {
            return new Response(JSON.stringify({ error: 'Banking details not found' }), { status: 404 });
        }
        return new Response(JSON.stringify({ details: bankingDetail.details }), { status: 200 });
    } catch (error) {
        console.error('Error fetching banking details:', error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }
};
