import { X, Check } from "lucide-react";


interface Props {
    title:string;
    setIsModal: any;
}

export const SuccessModal:React.FC<Props> = ({setIsModal, title}) => {
    debugger
    return (
        <div
            className="flex items-center justify-center fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm"
        >
            <div
                onClick={() => {
                    setIsModal(false);
                    window.location.reload();
                }}
                className="w-[600px] gap-5 px-7 bg-white text-[#b0b0b0] rounded-[20px] flex flex-col items-center justify-center"
            >
                <div className="flex flex-row w-full mt-[10px] justify-between">
                    <div className="w-[10px]"></div>
                    <div className="flex flex-row bg-[#b0b0b0] cursor-pointer rounded-full">
                        <X onClick={() => setIsModal(false)} width={18} height={18} color="#ffffff"/>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-10 justify-between mb-[50px]">
                    <h1 className="text-[24px] leading-6 text-black">{title}</h1>
                    <div className='flex items-center justify-center bg-blue-500 p-[25px] rounded-full'>
                        <Check color="#ffffff" />
                    </div>
                </div>
            </div>
        </div>
    )
}