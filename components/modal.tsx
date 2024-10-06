import {useEffect} from "react";
import {AtSign, Eye, Lock, MapPin, Phone, Send, User, X} from "lucide-react";

interface Props {
    className?:string;
    isModal: boolean;
    setModal: any;
}

export const Modal:React.FC<Props> = ({isModal, setModal}) => {
    useEffect(() => {
        if(isModal){
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
    }, [isModal]);
    return (
        <div onClick={() => setModal(false)} className="flex items-center justify-center overflow-y-hidden fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm">
            <div onClick={(e) => e.stopPropagation()}
                 className="w-[600px] gap-2 px-7 bg-white text-[#b0b0b0] rounded-[20px] flex flex-col items-center justify-center ">
                <div className='flex flex-row w-full mt-[10px] justify-between'>
                    <div className="w-[10px]"></div>
                    <div className="flex flex-row bg-[#b0b0b0] cursor-pointer rounded-full">
                        <X onClick={() => setModal(false)} width={18} height={18} color="#ffffff"/>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-1 ">
                    <h1 className="text-[24px] leading-6 text-black">Регистрация</h1>
                    <p className="text-[#b0b0b0] text-[16px]">Уже есть аккаунт? Авторизоваться</p>
                </div>
                <div className="flex flex-col gap-2 w-full text-[16px]">
                    <div>
                        <h3>Логин</h3>
                        <div
                            className="flex flex-row items-center px-4 py-1 gap-3 border-[1px] border-[#b0b0b0] rounded-[5px]">
                            <User width={20} color="#b0b0b0"/>
                            <input placeholder="Ваш логин"
                                   className="w-full bg-white border-transparent focus:outline-0" type="text"/>
                        </div>
                    </div>
                    <div>
                        <h3>E-mail</h3>
                        <div
                            className="flex flex-row items-center px-4 py-1 gap-3 border-[1px] border-[#b0b0b0] rounded-[5px]">
                            <AtSign width={20} color="#b0b0b0"/>
                            <input placeholder="Ваша почта"
                                   className="w-full bg-white border-transparent focus:outline-0" type="text"/>
                        </div>
                    </div>
                    <div>
                        <h3>Пароль</h3>
                        <div
                            className="flex flex-row items-center px-4 py-1 gap-3 border-[1px] border-[#b0b0b0] rounded-[5px]">
                            <Lock width={20} color="#b0b0b0"/>
                            <input placeholder="*****"
                                   className="w-full bg-white border-transparent focus:outline-0" type="text"/>
                            <Eye width={20} color="#b0b0b0"/>
                        </div>
                    </div>
                    <div>
                        <h3>Повторите пароль</h3>
                        <div
                            className="flex flex-row items-center px-4 py-1 gap-3 border-[1px] border-[#b0b0b0] rounded-[5px]">
                            <Lock width={20} color="#b0b0b0"/>
                            <input placeholder="*****"
                                   className="w-full bg-white border-transparent focus:outline-0" type="text"/>
                            <Eye width={20} color="#b0b0b0"/>
                        </div>
                    </div>
                    <div>
                        <h3>Имя и фамилия</h3>
                        <div
                            className="flex flex-row items-center px-4 py-1 gap-3 border-[1px] border-[#b0b0b0] rounded-[5px]">
                            <User width={20} color="#b0b0b0"/>
                            <input placeholder="Ваше имя и фамилия"
                                   className="w-full bg-white border-transparent focus:outline-0" type="text"/>
                        </div>
                    </div>
                    <div>
                        <h3>Телефон</h3>
                        <div
                            className="flex flex-row items-center px-4 py-1 gap-3 border-[1px] border-[#b0b0b0] rounded-[5px]">
                            <Phone width={20} color="#b0b0b0"/>
                            <input placeholder="Ваш номер"
                                   className="w-full bg-white border-transparent focus:outline-0" type="number"/>
                        </div>
                    </div>
                    <div>
                        <h3>Ваш регион</h3>
                        <div
                            className="flex flex-row items-center px-4 py-1 gap-3 border-[1px] border-[#b0b0b0] rounded-[5px]">
                            <MapPin width={20} color="#b0b0b0"/>
                            <input placeholder="Ваш регион"
                                   className="w-full bg-white border-transparent focus:outline-0" type="text"/>
                        </div>
                    </div>
                    <div>
                        <h3>Telegram</h3>
                        <div
                            className="flex flex-row items-center px-4 py-1 gap-3 border-[1px] border-[#b0b0b0] rounded-[5px]">
                            <Send width={20} color="#b0b0b0"/>
                            <input placeholder="Ваш логин Telegram"
                                   className="w-full bg-white border-transparent focus:outline-0" type="text"/>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row items-center gap-3 text-[10px]">
                    <input className="bg-white border-transparent focus:outline-0 w-[17px] h-[17px] focus:bg-white"
                           type="checkbox"/>
                    <p>Я согласен с условиями использования сервиса Renaissance-Invest, а также для получения email и
                        sms рассылок</p>
                </div>
                <div
                    className="flex items-center justify-center mb-[30px] py-3 rounded-[7px] bg-amber-500 text-[17px] leading-3 text-white w-full">
                    ЗАРЕГИСТРИРОВАТЬСЯ
                </div>
            </div>
        </div>
    )
}