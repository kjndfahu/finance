import NextAuth, { NextAuthOptions } from 'next-auth';
import { compare } from 'bcrypt';
import CredentialsProvider from 'next-auth/providers/credentials';
import {prisma} from "../../../../../prisma/prisma-client";
import {PrismaAdapter} from "@next-auth/prisma-adapter";

export const authOptions: NextAuthOptions = {
    adapter:PrismaAdapter(prisma),
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


                return {
                    id: String(findUser.id),
                    email: findUser.email,
                    name: findUser.login,
                    role: findUser.role,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token }) {
            console.log(token)
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
                token.balance = findUser.balance
                token.redirectTo = findUser.role === 'ADMIN' ? '/all-clients' : '/account';
            }

            return token;
        },
        session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    email:token.email,
                    balance: token.balance,
                    redirectTo: token.redirectTo,
                }
            }
            
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
