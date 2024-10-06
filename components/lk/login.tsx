'use client'

import {useRouter} from "next/navigation";
import {useTranslations} from "next-intl";
interface Props{
    className?:string;
}

export const Login:React.FC<Props> = ({className}) => {
    const router = useRouter()
    const t = useTranslations('Registration')
    const onClick = () => {
        router.back()
    }
    return (
        <div className="flex justify-center items-center mt-20 bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <button className="flex items-center space-x-2 text-gray-600">
                    <span onClick={onClick}>&larr;</span>
                    <span>{t('login')}</span>
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
                        <label htmlFor="password" className="sr-only">Пароль</label>
                        <input
                            type="password"
                            id="password"
                            placeholder={t('login-password')}
                            className="w-full text-black bg-white px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <p className="text-gray-400 w-full hover:text-black cursor-pointer mt-2">{t('forgot-password?')}</p>
                    </div>

                    <div className="flex w-full gap-2 items-center">
                        <div className="flex w-[50%] items-center justify-between">
                            <button
                                type="submit"
                                className="w-full text-black py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                            >
                                {t('login')}
                            </button>
                        </div>

                        <div className="w-[50%] text-center">
                            <a href="#" className="text-[16px] text-black hover:underline">
                                {t('dont-account?')}
                            </a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}