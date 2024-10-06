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
        <div className="flex flex-col items-center bg-[#F5F5F5] mt-10 rounded-[40px] justify-center py-[100px]">
            <div className="flex flex-col gap-2 items-center text-black ">
                <h1 className="text-[52px] font-semibold ">{t('title')}</h1>
                <p>{t('textmain')}</p>
            </div>
            <div className="flex flex-row justify-evenly gap-7 mt-10 w-full px-[120px]">
                {data.map((item) => (
                    <div key={item.title} className="flex w-[33%] flex-col gap-5 bg-[#FFFFFF] rounded-[20px] px-7 py-7 text-black">
                        <h2 className="text-[38px] font-semibold">{item.title}</h2>
                        <p className="text-[20px]">{item.text}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}