import {useTranslations} from "next-intl";

export const ProssesAbout:React.FC = () => {
    const t = useTranslations('ProssesAbout')
    const data = [
        {
            title: t('title1'),
            text: t('text1')
        },
        {
            title: t('title2'),
            text: t('text2')
        },
        {
            title: t('title3'),
            text: t('text3')
        },
    ]

    return (
        <div className="flex flex-col items-center bg-[#F5F5F5] mt-10 rounded-[40px] justify-center lg:py-[150px] py-[50px]">
            <h1 className="text-black md:text-[48px] text-[28px] leading-[28px] md:leading-[48px] font-semibold">{t('what')}</h1>
            <div className="flex md:flex-row flex-col justify-evenly gap-7 mt-10 w-full lg:px-[120px] mdbvp:px-[60px] smbvp:px-[20px] px-[10px]">
                {data.map((item) => (
                    <div key={item.title} className="flex md:w-[33%] w-full flex-col md:gap-5 gap-2 bg-[#FFFFFF] rounded-[20px] px-7 py-7 text-black">
                        <h2 className="lg:text-[38px] lg:leading-[38px] mdbvp:text-[25px] text-[17px] mdbvp:leading-[25px] font-semibold">{item.title}</h2>
                        <p className="md:text-[20px] text-[12px]">{item.text}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}