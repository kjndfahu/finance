'use client';

import {useEffect, useState} from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { formRegisterSchema, TFormRegisterData } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import {Eye, EyeOff} from "lucide-react";

interface Props {
    className?: string;
}

export const Registration: React.FC<Props> = ({ className }) => {
    const pathname = usePathname();
    const [error, setError] = useState('')
    const [errorEmail, setErrorEmail] = useState('')
    const locale = pathname.slice(0, 3);
    const router = useRouter();
    const t = useTranslations('Registration');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const form = useForm<TFormRegisterData>({
        resolver: zodResolver(formRegisterSchema),
        defaultValues: {
            email: '',
            login: '',
            name: '',
            surname: '',
            password: '',
            confirmPassword: '',
            phoneNumber: '',
            region: '',
            telegramId: '',
            referralCode: '',
        },
    });

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const referralCode = queryParams.get('referralCode');
        if (referralCode) {
            form.setValue('referralCode', referralCode);
            localStorage.setItem('referralCode', referralCode);
        } else {
            const storedReferralCode = localStorage.getItem('referralCode');
            if (storedReferralCode) {
                form.setValue('referralCode', storedReferralCode);
            }
        }
    }, [form]);

    const onClick = () => {
        router.back();
    };

    const onSubmit = async (values: z.infer<typeof formRegisterSchema>) => {
        const formData = {
            ...values,
            email: values.email.toLowerCase(),
            login: values.login.trim(),
            region: values.region,
        };

        console.log('Форма отправлена:', formData);
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            const errorText = await response.text();


            if(response.status === 406){
                setErrorEmail('Email уже занят')
            } else if (response.status === 405){
                setError('Логин уже занят')
            }

            console.log('Ошибка:', response.status, errorText);
        } else {
            const data = await response.json();
            console.log('Успех:', data);
            router.push(`${locale}/login`);
        }
    };

    console.log(errorEmail)
    console.log(error)
    return (
        <div className="flex justify-center items-center mt-5 bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <button className="flex items-center space-x-2 text-gray-600">
                    <span onClick={onClick}>&larr;</span>
                    <span>{t('registration-website')}</span>
                </button>

                <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-4">
                    <div>
                        <label htmlFor="email" className="sr-only">E-mail</label>
                        <input
                            {...form.register('email')}
                            type="email"
                            id="email"
                            placeholder={t('e-mail')}
                            className="w-full bg-white text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => form.setValue('email', e.target.value.toLowerCase())}
                        />
                        {errorEmail === 'Email уже занят' && (
                            <span className="text-red-500">{errorEmail}</span>
                        )}
                        {form.formState.errors.email && (
                            <span className="text-red-500">{form.formState.errors.email.message}</span>
                        )}
                    </div>

                    <div>
                        <label htmlFor="login" className="sr-only">Логин</label>
                        <input
                            {...form.register('login')}
                            type="text"
                            id="login"
                            placeholder={t('desired-login')}
                            className="w-full text-black bg-white px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onInput={(e) => {
                                const target = e.target as HTMLInputElement;
                                target.value = target.value.replace(/[^a-zA-Z0-9]/g, '');
                            }}
                        />
                        {error === 'Логин уже занят' && (
                            <span className="text-red-500">{error}</span>
                        )}
                        {form.formState.errors.login && (
                            <span className="text-red-500">{form.formState.errors.login.message}</span>
                        )}
                    </div>

                    <div>
                        <label htmlFor="password" className="sr-only">Пароль</label>
                        <div
                            className="flex items-center w-full text-black bg-white px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500  ">
                            <input
                                {...form.register('password')}
                                type={showNewPassword ? "text" : "password"}
                                id="password"
                                placeholder={t('desired-password')}
                                className="w-full bg-white border-transparent focus:outline-0"
                            />
                            <div className="cursor-pointer" onClick={() => setShowNewPassword(!showNewPassword)}>
                                {showNewPassword ? <EyeOff width={20} color="#b0b0b0"/> :
                                    <Eye width={20} color="#b0b0b0"/>}
                            </div>
                        </div>
                        {form.formState.errors.password && (
                            <span className="text-red-500">{form.formState.errors.password.message}</span>
                        )}
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="sr-only">Повторите пароль</label>
                        <div
                            className="flex items-center w-full text-black bg-white px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500  ">
                            <input
                                {...form.register('confirmPassword')}
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                placeholder={t('repeat-password')}
                                className="w-full bg-white border-transparent focus:outline-0"
                            />
                            <div className="cursor-pointer"
                                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                {showConfirmPassword ? <EyeOff width={20} color="#b0b0b0"/> :
                                    <Eye width={20} color="#b0b0b0"/>}
                            </div>
                        </div>
                        {form.formState.errors.confirmPassword && (
                            <span className="text-red-500">{form.formState.errors.confirmPassword.message}</span>
                        )}
                    </div>

                    <div className="flex space-x-4">
                        <div className="w-1/2">
                            <label htmlFor="name" className="sr-only">Имя</label>
                            <input
                                {...form.register('name')}
                                type="text"
                                id="name"
                                placeholder={t('first-name')}
                                className="w-full text-black bg-white px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {form.formState.errors.name && (
                                <span className="text-red-500">{form.formState.errors.name.message}</span>
                            )}
                        </div>
                        <div className="w-1/2">
                            <label htmlFor="surname" className="sr-only">Фамилия</label>
                            <input
                                {...form.register('surname')}
                                type="text"
                                id="surname"
                                placeholder={t('last-name')}
                                className="w-full text-black bg-white px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {form.formState.errors.surname && (
                                <span className="text-red-500">{form.formState.errors.surname.message}</span>
                            )}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="phoneNumber" className="sr-only">Номер телефона</label>
                        <input
                            {...form.register('phoneNumber')}
                            type="text"
                            placeholder={t('phone-number')}
                            className="w-full text-black bg-white px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {form.formState.errors.phoneNumber && (
                            <span className="text-red-500">{form.formState.errors.phoneNumber.message}</span>
                        )}
                    </div>

                    <div>
                        <label htmlFor="region" className="sr-only">Регион</label>
                        <input
                            {...form.register('region')}
                            type="text"
                            id="region"
                            placeholder={t('region')}
                            className="w-full text-black bg-white px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {form.formState.errors.region && (
                            <span className="text-red-500">{form.formState.errors.region.message}</span>
                        )}
                    </div>

                    <div>
                        <label htmlFor="telegramId" className="sr-only">Telegram</label>
                        <input
                            {...form.register('telegramId')}
                            type="text"
                            id="telegramId"
                            placeholder={t('telegram')}
                            className="w-full text-black bg-white px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {form.formState.errors.telegramId && (
                            <span className="text-red-500">{form.formState.errors.telegramId.message}</span>
                        )}
                    </div>

                    <div className="flex w-full gap-2 items-center">
                        <div className="flex w-[50%] items-center justify-between">
                            <button
                                type="submit"
                                className="w-full  py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                            >
                                {t('registration')}
                            </button>
                        </div>

                        <Link href={`${locale}/login`}>
                            <div className="text-[16px] text-left text-black hover:underline">
                                {t('have-account')}
                            </div>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};


