import {useTranslations} from "next-intl";

export const ProgrammInfo:React.FC = () => {
    const t = useTranslations('ProgrammInfo')
    const data = [
        {
            title: t('title-first'),
            text: t('text-first')
        },
        {
            title: t('title-sec'),
            text: t('text-sec')
        },
        {
            title: t('title-third'),
            text: t('text-third')
        },
    ]

    return (
        <div className="flex flex-col items-center bg-[#F5F5F5] mt-10 rounded-[40px] justify-center mdbvp:py-[100px] py-[50px]">
            <div className="flex flex-col gap-2 items-center text-black ">
                <h1 className="mdbvp:text-[52px] mdbvp:leading-[52px] text-[35px] leading-[35px] font-semibold text-center">{t('title')}</h1>
                <p className="text-center">{t('textmain')}</p>
            </div>
            <div className="flex md:flex-row flex-col justify-evenly mdbvp:gap-7 gap-4 mt-10 w-full mdbvp:px-[120px] px-[30px]">
                {data.map((item) => (
                    <div key={item.title} className="flex md:w-[33%] w-full flex-col gap-5 bg-[#FFFFFF] rounded-[20px] px-7 py-7 text-black">
                        <h2 className="mdbvp:text-[38px] text-[25px] font-semibold">{item.title}</h2>
                        <p className="mdbvp:text-[20px] text-[16px]">{item.text}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}