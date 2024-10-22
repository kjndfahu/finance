'use client'
import {useTranslations} from "next-intl";
import Link from "next/link";
import {useEffect, useState} from "react";

interface Props{
    className?:string;
    session:any;
}

export const MainFooter:React.FC<Props> = ({session, className}) => {
    const t = useTranslations('Footer')
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const isSessionNull = isClient && session === null
    return (
        <div
            className="flex flex-col bg-black w-full gap-7 py-10 items-center justify-center rounded-[30px] mt-[75px] mb-[50px] text-white font-semibold">
            <h4 className="text-[18px] leading-[18px]">{t('waiting')}</h4>
            <h2 className="mdbvp:text-[40px] mdbvp:leading-[40px] text-center text-[28px] leading-[28px]">{t('wealth')}</h2>
            <Link href={isSessionNull ? `/en/registration` : `/en/account`}>
                <div
                    className="flex items-center bg-[#15B0DB] rounded-[10px] py-3 px-7 font-semibold justify-center text-white">{t('started')}</div>
            </Link>
        </div>
    )
}