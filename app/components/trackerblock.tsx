import phone from './assets/investmentTracker.webp'
import Image from 'next/image'

export const Trackerblock:React.FC = () => {
    return (
        <div className="flex mt-[75px] items-center flex-row rounded-[20px] justify-center gap-[120px] bg-[radial-gradient(100%_100%_at_100%_100%,#f5e5ff_0,rgba(245,229,255,0)_55.92%),radial-gradient(105.27%_105.27%_at_-5.27%_3.34%,#e8febf_0,hsla(81,97%,87%,0)_62.69%),radial-gradient(100%_100%_at_100%_0,#ce80ff_0,#f7b3ed_44.95%,#ffcae2_73.96%,#ffbfc4_100%)]">
            <div className="flex flex-col gap-5">
                <div className="flex items-center justify-center py-1 rounded-[7px] bg-[#FF80DD] text-[14px] font-semibold text-white w-[100px]">Coming Soon
                </div>
                <h2 className="font-semibold text-black text-[50px]  leading-[43px]">Monitor All Assets with<br/> the Investment Tracker</h2>
                <p className="text-[20px] text-black font-thin">Revolutionize your investment management with our innovative<br/> tracker — manage accounts from multiple platforms in one<br/> place.</p>
            </div>
            <Image className="pt-[120px]" src={phone} alt="phone"/>
        </div>
    )
}
