import jassem from '../../public/assets/Jassem-H.-Zainal.png'
import hashim from '../../public/assets/Hashim-Gillani.png'
import muhannad from '../../public/assets/Muhannad-Abulhasan.png'
import mohamad from '../../public/assets/Mohamad-Charafeddine.png'
import Image from 'next/image'
import {useTranslations} from "next-intl";

export const ConsultantsGroup:React.FC = () => {
    const t = useTranslations('ConsultantsGroup')
    const data = [
        {
            img: jassem,
            name: t('nameJassem'),
            speciality:  t('specJassem'),
            info: t('textJassem')
        },
        {
            img: hashim,
            name: t('nameHashim'),
            speciality:  t('spec'),
            info: t('textHashim')
        },
        {
            img: muhannad,
            name: t('nameMuhannad'),
            speciality:  t('spec'),
            info:  t('textMuhannad')
        },
        {
            img: mohamad,
            name: t('nameMohamad'),
            speciality: t('spec'),
            info:   t('textMohamad')
        }
    ]

    return (
        <div className="flex items-center flex-col mt-16">
            <h1 className="text-[#ccbb88] lg:text-[40px] mdbvp:text-[28px] smbvp:text-[20px] text-[18px] font-semibold">Консультативная группа</h1>
            <div className="flex w-full items-center justify-center mdbvp:flex-auto flex-wrap flex-row lg:mt-20 mdbvp:mt-10 mt-5 gap-10">
                {data.map((item) => (
                    <div key={item.name} className="flex flex-col text-center items-center w-[25%] gap-2">
                        <Image src={item.img} alt="ee"/>
                        <h1 className="text-blue-700 mt-5 font-semibold lg:text-[20px] text-[17px] leading-[22px]">{item.name}</h1>
                        <h3 className="text-[#ccbb88] lg:text-[19px] text-[16px] lg:leading-[19px] leading-[16px] font-medium">{item.speciality}</h3>
                        <p className="lg:text-[19px] text-[16px] leading-[16px] text-center text-black lg:leading-[21px]">{item.info}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}