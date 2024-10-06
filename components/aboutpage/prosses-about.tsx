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
        <div className="flex flex-col items-center bg-[#F5F5F5] mt-10 rounded-[40px] justify-center py-[150px]">
            <h1 className="text-black text-[52px] font-semibold ">{t('what')}</h1>
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