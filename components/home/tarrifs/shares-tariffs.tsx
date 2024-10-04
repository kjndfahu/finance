import photo from '../../assets/launch.svg'
import Image from 'next/image'

interface Props{
    className?:string;
}

export const SharesTariffs:React.FC<Props> = ({className}) => {
    return (
        <div className="flex flex-col justify-between rounded-[30px] bg-[#d3f0f8] border-[1px] border-[#83c9db] text-black text-[18px] w-full">
            <div className="flex flex-col pt-7 px-5 gap-5">
                <div className="flex flex-col ">
                    <h2 className="text-[32px] font-semibold">Stocks and ETF</h2>
                    <h3 className="text-[20px] text-[#b0b0b0] font-semibold">from $100 to $3000</h3>
                </div>
                <p>Yield:<br/> 0.9% -1.7%</p>
                <p>Working period:<br/> 30 days</p>
                <p>Profit Withdrawal:<br/> Daily</p>
                <p>Покупка индексов, созданных<br/> нашей командой профессионалов</p>
            </div>
            <Image className="w-full rounded-b-[25px]" src={photo} alt="photo"/>
        </div>
    )
}