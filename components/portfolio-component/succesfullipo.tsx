import Image from 'next/image';
import {BeyondMeat, Facebook, Twitio, Zoom} from "../icons";

export const SuccesfullIPO: React.FC = () => {
    const companies = [
        {
            name: 'BEYOND MEAT',
            logo: <BeyondMeat className="lg:w-[220px] lg:h-[70px] w-[150px] h-[50px]"/>,
            type: 'Производитель растительного мяса',
            performance: '+441%',
            ipoDate: '03.05.2019',
            ipoPrice: '$25',
            sharesSold: '9,625 млн',
            investments: '$240 625 млн',
            maxPrice: '$240 (26.07.2019)',
            currentPrice: '$135',
        },
        {
            name: 'ZOOM',
            logo: <Zoom className="lg:w-[160px] lg:h-[70px] w-[110px] h-[40px]"/>,
            type: 'Коммуникационно-технологическая компания',
            performance: '+1171%',
            ipoDate: '18.04.2019',
            ipoPrice: '$36',
            sharesSold: '35,064 млн',
            investments: '$3,7 млрд',
            maxPrice: '$457 (02.09.2020)',
            currentPrice: '$457',
        },
        {
            name: 'TWILIO',
            logo: <Twitio className="lg:w-[190px] lg:h-[70px] w-[110px] h-[40px]"/>,
            type: 'Разработчик программного обеспечения',
            performance: '+1722%',
            ipoDate: '22.06.2016',
            ipoPrice: '$15',
            sharesSold: '10 млн',
            investments: '$150 млн',
            maxPrice: '$273 (03.09.2020)',
            currentPrice: '$273',
        },
        {
            name: 'FACEBOOK',
            logo: <Facebook className="lg:w-[190px] lg:h-[70px] w-[150px] h-[60px]"/>,
            type: 'Крупнейшая в мире соцсеть',
            performance: '+677%',
            ipoDate: '17.05.2012',
            ipoPrice: '$38',
            sharesSold: '421,2 млн',
            investments: '$16 млрд',
            maxPrice: '$295 (03.09.2020)',
            currentPrice: '$295',
        },
    ];
    return (
        <div className="mdbvp:px-[100px] px-[30px] bg-white w-full ">
            <h2 className="text-2xl text-black font-bold mb-8">Примеры успешных IPO</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {companies.map((company, index) => (
                    <div key={index}
                         className="border rounded-lg p-6 shadow-md flex flex-col justify-between bg-[#F3F7FA]">
                        <div className="flex w-full items-center justify-between">
                            <div className="flex mdbvp:flex-row flex-col justify-between">
                                <p className=" w-[25%] text-sm text-gray-500">{company.type}</p>
                                {company.logo}
                            </div>
                            <div className="flex justify-end text-green-500 w-[30%] font-bold text-lg">{company.performance}</div>
                        </div>
                        <div className="mt-4 text-sm text-[#777777]">
                            <p><strong>Выход на IPO:</strong> {company.ipoDate}</p>
                            <p><strong>Цена IPO:</strong> {company.ipoPrice}</p>
                            <p><strong>Продано акций:</strong> {company.sharesSold}</p>
                            <p><strong>Привлечено инвестиций:</strong> {company.investments}</p>
                            <p><strong>Максимальная цена:</strong> {company.maxPrice}</p>
                            <p><strong>Текущая цена:</strong> {company.currentPrice}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}