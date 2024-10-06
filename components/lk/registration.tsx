'use client'
import {useRouter} from "next/navigation";
import {useTranslations} from "next-intl";
interface Props{
    className?:string;
}

export const Registration:React.FC<Props> = ({className}) => {
    const router = useRouter()
    const t = useTranslations('Registration')
    const onClick = () => {
        router.back()
    }

    return (
        <div className="flex justify-center items-center mt-5 bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <button className="flex items-center space-x-2 text-gray-600">
                    <span onClick={onClick}>&larr;</span>
                    <span>{t('registration-website')}</span>
                </button>

                <form className="mt-4 space-y-4">
                    <div>
                        <label htmlFor="email" className="sr-only">E-mail</label>
                        <input
                            type="email"
                            id="email"
                            placeholder={t('e-mail')}
                            className="w-full bg-white text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="login" className="sr-only">Логин</label>
                        <input
                            type="text"
                            id="login"
                            placeholder={t('desired-login')}
                            className="w-full text-black bg-white px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="sr-only">Пароль</label>
                        <input
                            type="password"
                            id="password"
                            placeholder={t('desired-password')}
                            className="w-full text-black bg-white px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="sr-only">Пароль</label>
                        <input
                            type="password"
                            id="password"
                            placeholder={t('repeat-password')}
                            className="w-full text-black bg-white px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex space-x-4">
                        <div className="w-1/2">
                            <label htmlFor="firstName" className="sr-only">Имя</label>
                            <input
                                type="text"
                                id="firstName"
                                placeholder={t('first-name')}
                                className="w-full text-black bg-white px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="w-1/2">
                            <label htmlFor="lastName" className="sr-only">Фамилия</label>
                            <input
                                type="text"
                                id="lastName"
                                placeholder={t('last-name')}
                                className="w-full text-black bg-white px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="phone" className="sr-only">Номер телефона</label>
                        <input
                            type="text"
                            id="phone"
                            placeholder={t('phone-number')}
                            className="w-full text-black bg-white px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="region" className="sr-only">Регион</label>
                        <input
                            type="number"
                            id="region"
                            placeholder={t('region')}
                            className="w-full text-black bg-white px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="telegram" className="sr-only">Telegram</label>
                        <input
                            type="text"
                            id="telegram"
                            placeholder={t('telegram')}
                            className="w-full text-black bg-white px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex w-full gap-2 items-center">
                        <div className="flex w-[50%] items-center justify-between">
                            <button
                                type="submit"
                                className="w-full text-black py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                            >
                                {t('registration')}
                            </button>
                        </div>

                        <div className="w-[50%] text-center">
                            <a href="#" className="text-[16px] text-black hover:underline">
                                {t('have-account')}
                            </a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}