import photo from '../../assets/wealth.svg'
import Image from 'next/image'

interface Props{
    className?:string;
}

export const IpoTarrifs:React.FC<Props> = ({className}) => {
    return (
        <div className="flex flex-col justify-between rounded-[30px] bg-[#fff3db] border-[1px] border-[#f2c87b] text-black text-[18px] w-full ">
            <div className="flex flex-col pt-7 px-5 gap-5">
                <div className="flex flex-col ">
                    <h2 className="text-[32px] font-semibold">IPO</h2>
                    <h3 className="text-[20px] text-[#b0b0b0] font-semibold">from $15000 to $150000</h3>
                </div>
                <p>Individual participation:<br/> Yield:<br/> 46% - 70%</p>
                <p>Working period:<br/> 5 days</p>
                <p>Profit Withdrawal:<br/> At the end of the work term</p>
                <p>Partner Participation:<br/>
                    You need to contact support</p>
            </div>
            <Image className="w-full rounded-b-[25px]" src={photo} alt="photo"/>
        </div>
    )
}