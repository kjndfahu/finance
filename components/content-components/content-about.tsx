'use client'
import {useTranslations} from "next-intl";
import {useEffect, useState} from "react";
import Link from "next/link";

interface Props{
    className?:string;
    session:any;
}

export const ContentAbout:React.FC<Props> = ({session, className}) => {
    const t = useTranslations('ContentAbout')
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const isSessionNull = isClient && session === null;
    return (
    <div className="flex md:flex-row flex-col items-center justify-between lg:px-[120px] mdbvp:px-[60px] lg:py-[70px] mdbvp:py-[30px] smbvp:px-[30px] px-[10px] py-[20px]  mdbvp:rounded-[40px] smbvp:rounded-[10px] bg-[radial-gradient(100%_100%_at_100%_100%,rgba(248,172,255,.2),rgba(105,110,255,.2))]">
        <div className="flex flex-col md:items-start items-center md:text-left text-center mdbvp:gap-5 gap-3 md:pt-0 pt-[30px]">
            <h3 className="text-[#b0b0b0] lg:text-[20px] lg:leading-[20px] text-[15px] leading-[15px] font-semibold">{t('about')}</h3>
            <h2 className="lg:text-[56px] lg:leading-[56px] mdbvp:text-[32px] mdbvp:leading-[32px] text-[24px] leading-[24px] font-semibold text-black">{t('finance')}</h2>
            <h4 className="lg:text-[20px] lg:leading-[20px] text-[15px] leading-[15px] text-black">{t('text1')}<br/> {t('text2')}</h4>
            <Link href={isSessionNull ? `/en/registration` : `/en/account`}>
                <div
                    className="flex items-center bg-[#15B0DB] lg:text-[18px] lg:leading-[18px] text-[15px] leading-[15px] mdbvp:rounded-[10px] rounded-[3px] lg:w-[150px] w-[120px] mdbvp:py-2 py-1 mdbvp:px-7 px-3 font-semibold justify-center text-white">
                    {t('btn')}
                </div>
            </Link>
        </div>
        <img className="lg:w-[500px] lg:h-[420px] mdbvp:w-[320px] mdbvp:h-[280px] w-[250px] h-[200px] md:mt-0 mt-[40px]"
             src="https://raison.app/_nuxt/img/decoration-cubes-3x.3835fcc.webp" alt="abstract"/>
    </div>
    )
}