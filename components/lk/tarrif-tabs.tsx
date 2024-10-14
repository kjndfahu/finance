import {useTranslations} from "next-intl";

interface Props{
    className?:string;
    activeTab:number;
    setTab:any;
}

export const TarrifTabs:React.FC<Props> = ({activeTab, setTab, className})=>{
    const t = useTranslations('History')
    return (
        <div
            className="flex flex-col gap-3 text-[18px] text-black bg-white border-[1px] border-[#f5f5f5] md:p-4 rounded-[10px]">
            <div className="flex w-full flex-row md:p-4 px-2 gap-5 bg-[#f5f5f5] md:rounded-[7px]">
                <div className="w-full text-center">
                    <h3 onClick={() => setTab(1)}
                        className={`${activeTab === 1 ? 'text-black' : 'text-[#777777]'} md:text-[18px] text-[15px] cursor-pointer`}>Акции и
                        ETF</h3>
                </div>
                <div className="w-full text-center">
                    <h3 onClick={() => setTab(2)}
                        className={`${activeTab === 2 ? 'text-black' : 'text-[#777777]'} md:text-[18px] text-[15px] cursor-pointer`}>Венчур</h3>
                </div>
                <div className="w-full text-center">
                    <h3 onClick={() => setTab(3)}
                        className={`${activeTab === 3 ? 'text-black' : 'text-[#777777]'} md:text-[18px] text-[15px] cursor-pointer`}>IPO</h3>
                </div>
            </div>
        </div>
    )
}