
interface Props{
    className?:string;
}

export const CorporateStructure:React.FC<Props> = ({className}) => {
    const data = [
        {
            city: 'Dubai',
            number: '+971 4 452 07 77',
            mail: 'нужно создать почту',
            address: 'Dubai, UAE, Swiss Tower, Office 204, Jumeirah Lake Towers, PO Box: 309073'
        },
        {
            city: 'Hong Kong',
            number: '+852 2528 1238',
            mail: 'нужно создать почту',
            address: 'Hong Kong, Off. 1103-05, 11/F, East Town Building, 41 Lockhart Road'
        }
    ]
    return (
        <div className="flex flex-col gap-16 items-center text-black text-center mt-20">
            <div className="flex flex-col gap-4">
                <h1 className="lg:text-[48px] mdbvp:text-[32px] smbvp:text-[25px] text-[20px] leading-[20px] smbvp:leading-[25px] mdbvp:leading-[32px] font-semibold lg:leading-[55px]">Corporate structure<br/> and legal and
                    regulatory framework</h1>
                <p className="lg:text-[22px] mdbvp:text-[19px] text-[16px] leading-[16px] mdbvp:leading-[22px] lg:leading-[22px]">We've built a powerful and compliant infrastructure to scale with
                    confidence.</p>
            </div>

            <div className="flex flex-col gap-5 z-10 bg-[#f5f5f5] w-full p-5 rounded-[40px] text-black">
                <h1 className="text-[32px]">Alliance Asset Management</h1>
                <div className="flex flex-row gap-3">
                    <div className="bg-white h-[300px] w-[50%] rounded-[20px]"></div>
                    <div className="bg-white h-[300px] w-[50%] rounded-[20px]"></div>
                </div>
            </div>

            <div className="flex flex-row gap-10 w-full z-10">
                {data.map((item) => (
                    <div key={item.city} className="bg-white text-left text-black p-5 border-[1px] border-black w-[50%] mdbvp:rounded-[20px] rounded-[10px]">
                        <h2 className="lg:text-[25px] mdbvp:text-[22px] smbvp:text-[20px] text-[17px]">{item.city}</h2>
                        <h3 className="lg:text-[19px] smbvp:text-[15px] text-[13px]">{item.number}</h3>
                        <h4 className="lg:text-[22px] smbvp:text-[15px] text-[13px]">{item.mail}</h4>
                        <p className="lg:text-[16px] smbvp:text-[14px] text-[12px] text-[#b0b0b0]">{item.address}</p>
                    </div>
                ))}
            </div>

            <img className="absolute z-1 w-[80%] h-[80%] mt-[220px]"
                 src="https://raison.app/_nuxt/img/picture-world-map-1620.d3270ad.webp" alt="we"/>
        </div>
    )
}