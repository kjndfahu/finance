interface Props{
    className?:string
}

export const HeaderRight:React.FC<Props> = ({className}) => {
    return (
        <div className="flex flex-row items-center text-[19px] gap-5">
            <h2 className="text-black">English</h2>
            <div
                className="flex items-center bg-[#e5f9ff] rounded-[10px] py-1 px-3 font-semibold justify-center text-[#15B0DB]">Invite
                and earn
            </div>
            <div
                className="flex items-center bg-[#15B0DB] rounded-[10px] py-1 px-7 font-semibold justify-center text-white">Get started</div>
        </div>
    )
}