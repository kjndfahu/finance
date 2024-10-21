'use client'
import abstract from '../../public/assets/abstract.png';
import Image from "next/image";
import {useTranslations} from "next-intl";
import {useEffect, useState} from "react";
import Link from "next/link";

interface Props{
    className?:string;
    session:any;
}

export const AboutFirst:React.FC<Props> = ({session})=>{
    const t = useTranslations('AboutFirst')
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const isSessionNull = isClient && session === null;
    return (
        <div className="flex items-center md:flex-row flex-col justify-between lg:px-[120px] mdbvp:px-[60px] lg:py-[150px] mdbvp:py-[70px] smbvp:px-[30px] px-[10px] py-[20px] bg-[#f3f4eb] mdbvp:rounded-[40px] smbvp:rounded-[10px] rounded-[5px]">
            <div className="flex flex-col md:items-start items-center md:text-left text-center mdbvp:gap-5 gap-2 md:pt-0 pt-[30px]">
                <h3 className="text-[#b0b0b0] lg:text-[20px] lg:leading-[20px] mdbvp:text-[15px] mdbvp:leading-[15px] text-[12px]  font-semibold">{t('indexes')}</h3>
                <h2 className="lg:text-[56px] lg:leading-[56px] mdbvp:text-[32px] leading-[32px] text-[24px]  smbvp:leading-[24px] font-semibold text-black">{t('reliable-source')}<br/> {t('income')}</h2>
                <h4 className="lg:text-[20px] lg:leading-[20px] mdbvp:text-[15px] mdbvp:leading-[15px] text-[15px] leading-[15px] text-black">{t('yield')}<br/> {t('tenure')}</h4>
                <Link href={isSessionNull ? `/en/registration` : `/en/account`}>
                    <div
                        className="flex items-center bg-[#15B0DB] lg:text-[18px] lg:leading-[18px] mdbvp:text-[15px] mdbvp:leading-[15px] text-[12px] leading-[12px] mdbvp:rounded-[10px] rounded-[3px] lg:w-[150px] mdbvp:w-[120px] w-[80px] mdbvp:py-2 py-1 mdbvp:px-7 px-3 font-semibold justify-center text-white">
                        {t('login')}
                    </div>
                </Link>
            </div>
            <Image
                className="lg:w-[400px] lg:h-[300px] mdbvp:w-[250px] mdbvp:h-[200px] w-[170px] h-[120px] md:mt-0 mt-[50px]"
                src={abstract} alt="abstract"/>
        </div>
    )
}