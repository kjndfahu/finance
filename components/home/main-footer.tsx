interface Props{
    className?:string;
}

export const MainFooter:React.FC<Props> = ({className}) => {
    return (
        <div
            className="flex flex-col bg-black w-full gap-7 py-10 items-center justify-center rounded-[30px] mt-[75px] text-white font-semibold">
            <h4 className="text-[18px] leading-[18px]">What are you waiting for?</h4>
            <h2 className="text-[40px] leading-[40px]">Together we will increase your wealth</h2>
            <div
                className="flex items-center bg-[#15B0DB] rounded-[10px] py-3 px-7 font-semibold justify-center text-white">Get
                started
            </div>
        </div>
    )
}