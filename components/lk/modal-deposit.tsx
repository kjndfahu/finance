import { X } from "lucide-react";
import Link from "next/link";
import {useTranslations} from "next-intl";

interface Props {
    className?: string;
    isModalOpen: boolean;
    setModalOpen: (isOpen: boolean) => void;
}

export const ModalDeposit: React.FC<Props> = ({setModalOpen}) => {
    const t = useTranslations('LK')
    return (
        <div
            onClick={() => setModalOpen(false)}
            className="flex items-center justify-center fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="w-[600px] gap-5 px-7 bg-white text-[#b0b0b0] rounded-[20px] flex flex-col items-center justify-center"
            >
                <div className="flex flex-row w-full mt-[10px] justify-between">
                    <div className="w-[10px]"></div>
                    <div className="flex flex-row bg-[#b0b0b0] cursor-pointer rounded-full">
                        <X onClick={() => setModalOpen(false)} width={18} height={18} color="#ffffff"/>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <h1 className="text-[24px] text-center leading-6 text-black">{t('modaltext')}</h1>
                </div>
                <Link className="w-full" href="https://t.me/technical_support_alliance">
                    <button
                        className="md:mt-6 mt-2 w-full mb-5 md:py-3 py-1 bg-blue-600 md:text-[16px] text-[13px] text-white rounded-lg font-medium hover:bg-blue-700">
                        {t('contact-support')}
                    </button>
                </Link>
            </div>
        </div>
    );
};
