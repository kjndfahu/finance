'use client';

import {useTranslations} from "next-intl";
import {PdfIcon} from "../icons";

interface Props {
    className?: string;
}

export const CorporateStructure: React.FC<Props> = ({ className }) => {
    const t = useTranslations('CorporateStructure')
    const data = [
        {
            city: 'Dubai',
            number: '+971 4 452 07 77',
            mail: 'allventcap@gmail.com',
            address: 'Dubai, UAE, Djumeira Lake Towers, PO309073.'
        },
        {
            city: 'Hong Kong',
            number: '+852 2528 1238',
            mail: 'allventcap@gmail.com',
            address: 'Hong Kong, Off. 1103-05, 11/F, East Town Building, 41 Lockhart Road'
        }
    ];

    return (
        <div className="flex flex-col  gap-16 items-center text-black text-center mt-20">
            <div className="flex flex-col gap-4">
                <h1 className="lg:text-[48px] mdbvp:text-[32px] smbvp:text-[25px] text-[20px] leading-[20px] smbvp:leading-[25px] mdbvp:leading-[32px] font-semibold lg:leading-[55px]">
                    {t('maintext')}<br />  {t('maintext2')}
                </h1>
                <p className="lg:text-[22px] mdbvp:text-[19px] text-[16px] leading-[16px] mdbvp:leading-[22px] lg:leading-[22px]">
                    {t('text')}
                </p>
            </div>

            <div className="flex flex-col gap-5 z-10 bg-[#f5f5f5] w-full p-5 rounded-[40px] text-black">
                <h1 className="text-[32px]">Alliance Asset Management</h1>
                <div className="flex md:flex-row flex-col gap-3">
                    <div className="flex flex-col text-left bg-white gap-5 pt-5 px-3 md:w-[50%] w-full rounded-[20px]">
                        <h1 className="md:text-[30px] text-[22px]">Alliance VC</h1>
                        {[
                            { title: 'Belize Financial Services Commision-1', href: '/assets/belize-financial-services-commision-1.pdf' },
                            { title: 'Certificate of membership', href: '/assets/certificate-of-membership.pdf' },
                            { title: 'Cyprus Financial Services Commison', href: '/assets/cyprus-financial-services-commison.pdf' },
                            { title: 'RAK Free Trade Zone', href: '/assets/RAK-free-trade-zone.pdf' },
                            { title: 'SEC 801-107170', href: '/assets/SEC-801-107170.pdf' },
                            { title: 'Trademark registration', href: '/assets/trademark-registration.pdf' },
                        ].map((item, index) => (
                            <div key={index} className="flex flex-row md:gap-5 gap-2 items-center">
                                <a href={item.href} download>
                                    <PdfIcon className="smbvp:w-[35px] smbvp:h-[35px] w-[28px] h-[28px]"/>
                                </a>
                                <div className="flex flex-col text-left">
                                    <h2 className="lg:text-[20px] mdbvp:text-[20px] smbvp:text-[19px] text-[15px]">
                                        {item.title}
                                    </h2>
                                </div>
                            </div>
                        ))}

                        <div className="flex gap-1 mb-5 flex-col">
                            <img className="smbvp:h-[50px] smbvp:w-[220px] h-[20px] w-[100px]"
                                 src="https://www.bvifsc.vg/sites/default/files/logo_0_0.png" alt=""/>
                            <a href="https://www.bvifsc.vg/regulated-entities/global-alliance-fund-management-ltd"
                               className="lg:text-[16px] smbvp:text-[14px] text-[8px] text-[#b0b0b0]">
                                https://www.bvifsc.vg/regulated-entities/global-alliance-fund-management-ltd
                            </a>
                        </div>
                    </div>
                    <div
                        className="flex flex-col justify-center text-left h-[200px] bg-white gap-5 pt-5 md:px-10 px-3 md:w-[50%] w-full rounded-[20px]">
                        <div className="flex flex-row md:gap-5 gap-1 items-center">
                            <a href="/assets/FAQ_.pdf"download>
                                <PdfIcon className="smbvp:w-[35px] smbvp:h-[35px] w-[28px] h-[28px]"/>
                            </a>
                            <div className="flex flex-col text-left">
                                <h2 className="lg:text-[20px] mdbvp:text-[18px] smbvp:text-[16px] text-[14px]">FAQ</h2>
                            </div>
                        </div>
                        <div className="flex flex-row md:gap-5 gap-1 items-center">
                            <a href="/assets/Клиентское%20соглашение.pdf" download>
                                <PdfIcon className="smbvp:w-[35px] smbvp:h-[35px] w-[28px] h-[28px]"/>
                            </a>
                            <div className="flex flex-col text-left">
                                <h2 className="lg:text-[20px] mdbvp:text-[18px] smbvp:text-[16px] text-[14px]">Клиентское
                                    соглашение</h2>
                            </div>
                        </div>
                        <div className="flex flex-row md:gap-5 gap-1 items-center">
                            <a href="/assets/Политика%20Конфиденциальности.pdf" download>
                                <PdfIcon className="smbvp:w-[35px] smbvp:h-[35px] w-[28px] h-[28px]"/>
                            </a>
                            <div className="flex flex-col text-left">
                                <h2 className="lg:text-[20px] mdbvp:text-[18px] smbvp:text-[16px] text-[14px]">Политика
                                    конфиденциальности</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-row md:gap-10 gap-3 w-full z-10">
                {data.map((item) => (
                    <div key={item.city}
                         className="bg-white text-left text-black p-5 border-[1px] border-black w-[50%] mdbvp:rounded-[20px] rounded-[10px]">
                        <h2 className="lg:text-[25px] mdbvp:text-[22px] smbvp:text-[20px] text-[17px]">{item.city}</h2>
                        <h3 className="lg:text-[19px] smbvp:text-[15px] text-[13px]">{item.number}</h3>
                        <h4 className="lg:text-[22px] smbvp:text-[15px] text-[13px]">{item.mail}</h4>
                        <p className="lg:text-[16px] smbvp:text-[14px] text-[12px] text-[#b0b0b0]">{item.address}</p>
                    </div>
                ))}
            </div>

            <img className="absolute z-1 w-[80%] h-[80%] mt-[220px]"
                 src="https://raison.app/_nuxt/img/picture-world-map-1620.d3270ad.webp" alt="we"/>
        </div>
    );
};
