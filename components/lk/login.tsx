'use client'

import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { formLoginSchema, TFormLoginData } from "./schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import toast from "react-hot-toast";

interface Props {
    className?: string;
    session: any;
}

export const Login: React.FC<Props> = ({ session, className }) => {
    const pathname = usePathname();
    const locale = pathname.slice(0, 3);
    const form = useForm<TFormLoginData>({
        resolver: zodResolver(formLoginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });
    console.log(session?.user?.role);

    const router = useRouter(); // Переместил сюда

    const onSubmit = async (data: TFormLoginData) => {
        try {
            const resp = await signIn('credentials', {
                ...data,
                redirect: false
            });

            if (resp?.ok) {
                router.push(`${locale}/account`);
            } else {
                toast.error('Login failed, please try again.');
            }
        } catch (error) {
            console.log('ERROR [LOGIN]', error);
            toast.error('An unexpected error occurred, please try again.');
        }
    };

    const t = useTranslations('Registration');
    const onClick = () => {
        router.back();
    }

    return (
        <div className="flex justify-center items-center mt-20 bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <button className="flex items-center space-x-2 text-gray-600">
                    <span onClick={onClick}>&larr;</span>
                    <span>{t('login')}</span>
                </button>
                <form className="mt-4 space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="email" className="sr-only">E-mail</label>
                        <input
                            {...form.register('email')}
                            name="email"
                            type="email"
                            id="email"
                            placeholder={t('e-mail')}
                            className="w-full bg-white text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {form.formState.errors.email && (
                            <span className="text-red-500">{form.formState.errors.email.message}</span>
                        )}
                    </div>

                    <div>
                        <label htmlFor="password" className="sr-only">Пароль</label>
                        <input
                            {...form.register('password')}
                            name="password"
                            type="password"
                            id="password"
                            placeholder={t('login-password')}
                            className="w-full text-black bg-white px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {form.formState.errors.password && (
                            <span className="text-red-500">{form.formState.errors.password.message}</span>
                        )}
                        <p className="text-gray-400 w-full hover:text-black cursor-pointer mt-2">{t('forgot-password?')}</p>
                    </div>

                    <div className="flex w-full gap-5 items-center">
                        <div className="flex w-[50%] items-center justify-between">
                            <button
                                type="submit"
                                className="w-full text-black py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                            >
                                {t('login')}
                            </button>
                        </div>

                        <Link href={`${locale}/registration`}>
                            <div className="flex items-center justify-center w-full text-[16px] text-black hover:underline">
                                {t('dont-account?')}
                            </div>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
