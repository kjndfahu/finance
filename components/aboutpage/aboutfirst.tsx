import abstract from '../../public/assets/abstract.png';
import Image from "next/image";
import {useTranslations} from "next-intl";

interface Props{
    className?:string;
}

export const AboutFirst:React.FC<Props> = ({})=>{
    const t = useTranslations('AboutFirst')
    return (
        <div className="flex flex-row items-center justify-between lg:px-[120px] mdbvp:px-[60px] lg:py-[150px] mdbvp:py-[70px] smbvp:px-[30px] px-[10px] py-[20px] bg-[#f3f4eb] mdbvp:rounded-[40px] smbvp:rounded-[10px] rounded-[5px]">
            <div className="flex flex-col mdbvp:gap-5 gap-2">
                <h3 className="text-[#b0b0b0] lg:text-[20px] lg:leading-[20px] mdbvp:text-[15px] mdbvp:leading-[15px] smbvp:text-[12px] text-[10px] font-semibold">{t('indexes')}</h3>
                <h2 className="lg:text-[56px] lg:leading-[56px] mdbvp:text-[32px] mdbvp:leading-[32px] smbvp:text-[24px] text-[17px] leading-[17px] smbvp:leading-[24px] font-semibold text-black">{t('reliable-source')}<br/> {t('income')}</h2>
                <h4 className="lg:text-[20px] lg:leading-[20px] mdbvp:text-[15px] mdbvp:leading-[15px] smbvp:text-[12px] text-[10px] leading-[10px] smbvp:leading-[12px] text-black">{t('yield')}<br/> {t('tenure')}</h4>
                <div className="flex items-center bg-[#15B0DB] lg:text-[18px] lg:leading-[18px] mdbvp:text-[15px] mdbvp:leading-[15px] text-[12px] leading-[12px] mdbvp:rounded-[10px] rounded-[3px] lg:w-[150px] mdbvp:w-[120px] w-[80px] mdbvp:py-2 py-1 mdbvp:px-7 px-3 font-semibold justify-center text-white">{t('login')}</div>
            </div>
            <Image className="lg:w-[400px] lg:h-[300px] mdbvp:w-[250px] mdbvp:h-[200px] smbvp:w-[170px] smbvp:h-[120px] w-[100px] h-[75px]" src={abstract} alt="abstract"/>
        </div>
    )
}