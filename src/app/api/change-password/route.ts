import bcrypt from 'bcrypt';
import { prisma } from '../../../../prisma/prisma-client';

export const PUT = async (req: Request) => {
    // Получаем данные из запроса
    const { email, currentPassword, newPassword } = await req.json();

    // Проверка, что все данные присутствуют
    if (!email || !currentPassword || !newPassword) {
        return new Response(JSON.stringify({ error: 'Email, current password, and new password are required' }), {
            status: 400,
        });
    }

    try {
        const user = await prisma.user.findFirst({
            where: { email },
        });

        if (!user) {
            return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
        }

        if (!user.password) {
            return new Response(JSON.stringify({ error: 'Password not found in database' }), { status: 500 });
        }


        const isMatch = await bcrypt.compare(currentPassword, user.password);

        if (!isMatch) {
            return new Response(JSON.stringify({ error: 'Incorrect current password' }), { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await prisma.user.update({
            where: { email },
            data: { password: hashedPassword },
        });

        return new Response(JSON.stringify({ message: 'Password updated successfully' }), { status: 200 });
    } catch (error) {
        console.error('Error in password update:', error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }
};
