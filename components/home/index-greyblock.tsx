'use client'
import {ArrowRight} from "lucide-react";
import {useTranslations} from "next-intl";
import {useEffect, useState} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";

interface Props{
    className?:string
    session:any;
}

export const IndexGreyblock:React.FC<Props> = ({session,className})=>{
    const t = useTranslations('IndexGreyBlock')
    const [isClient, setIsClient] = useState(false);
    const router = useRouter();  // инициализируем useRouter

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        router.push('/ru/investment-plans');
        setTimeout(() => {
            window.scrollTo({ top: 2800, behavior: 'smooth' });
        }, 300);
    };

    console.log(session)

    const isSessionNull = isClient && session === null;
    return (
        <div className="flex bg-[#F5F5F5] md:rounded-[50px] rounded-[20px] md:py-[100px] py-[30px] w-full items-center justify-center">
            <div className="flex flex-col gap-5">
                <h2 className="text-black md:text-[42px] text-[24px] leading-[24px] md:leading-[45px] font-semibold">{t('invest-in')}<br/> <span className="text-[#07B1B6]">{t('ready-made')}<br/> {t('indexes')}</span>.</h2>
                <p className="md:text-[20px] md:leading-[20px] smbvp:text-[15px] smbvp:leading-[15px] text-[13px] leading-[13px] text-black font-thin">{t('designed-indices')}<br/> {t('market-conditions')}</p>
                <Link href={`/ru/investment-plans`} onClick={handleLinkClick}>
                    <div
                        className="flex items-center text-black smbvp:text-[18px] text-[13px] rounded-[10px] py-2 smbvp:w-[175px] w-[120px] gap-2 font-semibold justify-center border-[1px] border-black">
                        {t('learn-more')}
                        <ArrowRight/>
                    </div>
                </Link>

            </div>
        </div>
    )
}