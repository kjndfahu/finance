import photo from '../../assets/growth.svg'
import Image from 'next/image'

interface Props{
    className?:string;
}

export const PrivateTarrifs:React.FC<Props> = ({className}) => {
    return (
        <div className="flex flex-col rounded-[30px] justify-between bg-[#d0e8dc] border-[1px] border-[#8dbfa6] text-black text-[18px] w-full">
            <div className="flex flex-col pt-7 px-5 gap-5">
                <div className="flex flex-col ">
                    <h2 className="text-[32px] font-semibold">Private markets</h2>
                    <h3 className="text-[20px] text-[#b0b0b0] font-semibold">from $3000 to $50000</h3>
                </div>
                <p>Yield:<br/> 2% -3.1%</p>
                <p>Working period:<br/> 15 days</p>
                <p>Profit Withdrawal:<br/> At the end of the work term</p>
                <p>Invest in startups at all stages<br/> of development from early stage<br/> to late stage
                    to late stage</p>
            </div>
            <Image className="w-full rounded-b-[25px]" src={photo} alt="photo"/>
        </div>
    )
}