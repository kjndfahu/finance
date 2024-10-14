import Image from 'next/image';

export const SuccesfullIPO: React.FC = () => {
    const companies = [
        {
            name: 'BEYOND MEAT',
            logo: 'https://ginsbergs.com/wp-content/uploads/2021/08/Beyond-Meat-Logo.png', // Replace with actual logo paths
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
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Zoom_Communications_Logo.svg/1200px-Zoom_Communications_Logo.svg.png',
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
            logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c0/Twilio_logo.png',
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
            logo: 'https://static.xx.fbcdn.net/rsrc.php/y1/r/4lCu2zih0ca.svg',
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
                            <p className=" w-[25%] text-sm text-gray-500">{company.type}</p>
                            <img className="lg:flex hidden w-[30%] h-[40px]" src={company.logo} alt="logo"/>
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