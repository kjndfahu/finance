'use client'
import {useTranslations} from "next-intl";
import {useEffect, useState} from "react";
import Link from "next/link";

interface Props{
    className?:string;
    session:any;
}

export const GetAheadAbout:React.FC<Props> = ({session, className}) => {
    const t = useTranslations('GetAheadAbout')
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const isSessionNull = isClient && session === null;
    return (
        <div className="flex mdbvp:flex-row flex-col items-center justify-between text-black w-full smbvp:gap-[70px] gap-[20px] mt-16 mdbvp:px-[100px]">
            <div className="flex flex-col mdbvp::items-start items-center mdbvp:text-left text-center text-black mdbvp:w-[50%] gap-7">
                <h2 className="md:text-[42px] md:leading-[45px] text-[28px] leading-[28px] font-semibold">{t('title1')}</h2>
                <p className="text-[20px] leading-[23px]">{t('text1')}</p>
                <Link href={isSessionNull ? `/en/registration` : `/en/account`}>
                    <div
                        className="flex items-center bg-[#15B0DB] rounded-[10px] w-[150px] py-2 px-7 font-semibold justify-center text-white">
                        {t('btn')}
                    </div>
                </Link>
            </div>
            <div className="flex justify-end mdbvp:w-[50%]height-[300px] rounded-[35px]">
                <img className="h-[300px]" src="https://raison.app/img/ventures/rocket.webp" alt=""/>
            </div>
        </div>
    )
}