'use client'
import Link from "next/link";
import {useTranslations} from "next-intl";
import {useEffect, useState} from "react";

interface Props{
    className?:string;
    session:any;
}

export const AboutImage:React.FC<Props> = ({session, className}) => {
    const t = useTranslations('AboutImage')
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    console.log(session)

    const isSessionNull = isClient && session === null;

    return(
        <div className="flex flex-col justify-center w-full mdbvp:h-[600px] md:h-[300px] rounded-[30px] bg-cover bg-center bg-[url('https://raison.app/_nuxt/img/human.941d674.jpg')]">
            <div className="flex flex-col justify-center mdbvp:mx-[100px] md:mx-[40px] md:my-0 my-5 mx-[20px] mdbvp:w-[570px] md:w-[300px] w-[200px] md:gap-5 gap-2">
                <h1 className="mdbvp:text-[56px] md:text-[32px] text-[25px] leading-[25px] mdbvp:leading-[55px] md:leading-[32px] font-semibold">{t('financial-world')}</h1>
                <h3 className="mdbvp:text-[22px] md:text-[20px] text-[13px] leading-[13px] md:leading-[22px] mdbvp:leading-[27px]">{t('earn-money')}</h3>
                <Link href={isSessionNull ? `/en/registration` : `/en/account`}>
                    <div
                        className="flex md:text-[15px] text-[10px] items-center bg-[#15B0DB] md:w-[190px] w-[100px] md:rounded-[10px] py-1 md:px-7 px-1 font-semibold justify-center text-white">{t('getstarted')}
                    </div>
                </Link>
            </div>
        </div>
    )
}