'use client'
import {useTranslations} from "next-intl";
import {useEffect, useState} from "react";
import Link from "next/link";

interface Props{
    className?:string;
    session:any;
}

export const InvestIPOAbout:React.FC<Props> = ({session}) => {
    const t = useTranslations('InvestIPOAbout')
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const isSessionNull = isClient && session === null;
    return (
        <div
            className="flex mt-[50px] items-center lg:py-[50px] mdbvp:py-[40px] smbvp:py-[30px] py-[20px] md:flex-row flex-col  md:rounded-[20px] rounded-[5px] justify-center mdbvp:gap-[150px] gap-5 bg-[#E7FAFD]">
            <div className="flex flex-col md:items-start items-center md:text-left text-center mdbvp:gap-7 gap-3 md:pt-0 pt-[30px]">
                <h4 className="mdbvp:text-[20px] text-[15px] font-semibold text-[#b0b0b0]">IPO</h4>
                <h2 className="font-semibold text-black mdbvp:text-[50px] mdbvp:leading-[43px] md:text-[32px] md:leading-[32px] text-[25px] leading-[27px]">{t('title1')}<br/> {t('title2')}</h2>
                <p className="mdbvp:text-[20px] mdbvp:leading-[20px] text-[15px] leading-[15px] text-black font-thin">{t('text1')}</p>
                <Link href={isSessionNull ? `/en/registration` : `/en/account`}>
                    <div
                        className="flex items-center bg-[#15B0DB] lg:text-[18px] lg:leading-[18px] text-[15px] leading-[15px] mdbvp:rounded-[10px] rounded-[3px] lg:w-[150px] w-[120px]  mdbvp:py-2 py-1 px-7 font-semibold justify-center text-white">
                        {t('btn')}
                    </div>
                </Link>
            </div>
            <img className="mdbvp:w-[400px] w-[250px] md:pt-0 pt-[40px]"
                 src="https://raison.app/_ipx/_/img/stocksEtf/growth.png" alt="phone"/>
        </div>
    )
}