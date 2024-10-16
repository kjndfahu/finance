import NextAuth, { NextAuthOptions, User as NextAuthUser } from 'next-auth';
import { compare } from 'bcrypt';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from "../../../../../prisma/prisma-client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

// Определите интерфейс для пользователя
interface User extends NextAuthUser {
    id: string;
    role: string;
    balance: number; // Добавьте другие свойства, если необходимо
}

// Определите настройки аутентификации
export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'email', type: 'text', placeholder: 'user@test.ru' },
                password: { label: 'password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials) return null;

                const values = {
                    email: credentials.email,
                };

                const findUser = await prisma.user.findFirst({
                    where: values,
                });

                if (!findUser) return null;

                const isPasswordValid = await compare(credentials.password, findUser.password);

                if (!isPasswordValid) return null;

                // Верните пользователя с необходимыми полями
                return {
                    id: String(findUser.id),
                    email: findUser.email,
                    name: findUser.login,
                    role: findUser.role,
                    balance: findUser.balance, // Добавьте баланс или другие необходимые поля
                } as User; // Приведение типа
            },
        }),
    ],
    callbacks: {
        async jwt({ token }) {
            console.log(token);
            const findUser = await prisma.user.findFirst({
                where: {
                    email: token.email!,
                },
            });

            if (findUser) {
                token.id = String(findUser.id);
                token.email = findUser.email;
                token.login = findUser.login;
                token.role = findUser.role;
                token.balance = findUser.balance;
            }

            return token;
        },
        session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    email: token.email,
                    balance: token.balance,
                    role: token.role,
                }
            };
        },
    },
};

// Экспортируйте обработчик
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
