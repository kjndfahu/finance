import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../prisma/prisma-client";
import CredentialsProvider from "next-auth/providers/credentials";
import { $Enums } from ".prisma/client";
import Role = $Enums.Role;

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET!,
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text', placeholder: 'user@test.ru' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials) return null;

                const user = await prisma.user.findFirst({
                    where: { email: credentials.email },
                });

                if (!user) {
                    console.log('User not found:', credentials.email);
                    return null;
                }

                // Проверка пароля
                if (credentials.password !== user.password) {
                    console.log('Incorrect password for user:', credentials.email);
                    return null;
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.login,
                    role: user.role,
                    balance: Number(user.balance),
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token }) {
            const findUser = await prisma.user.findFirst({
                where: { email: token.email! },
            });

            if (findUser) {
                token.id = findUser.id;
                token.email = findUser.email;
                token.login = findUser.login;
                token.role = findUser.role;
                token.balance = Number(findUser.balance);
            }

            return token;
        },
        async session({ session, token }) {
            session.user = {
                ...session.user,
                email: token.email,
                role: token.role as Role,
                balance: Number(token.balance),
            };
            return session;
        },
    },
};
