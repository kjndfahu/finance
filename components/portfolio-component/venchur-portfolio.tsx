export const VenchurPortfolio:React.FC = () => {
    const companies = [
        {
            name: 'Neuralink',
            logo: 'https://pbs.twimg.com/profile_images/1661856130535165953/zMoW6Sr1_400x400.jpg',
            description: 'Разработка нейрокомпьютерных интерфейсов',
            tags: ['BioTech', 'Early Stage'],
            valuation: '$2.15B',
            country: 'США',
            founded: 2016,
        },
        {
            name: 'SpaceX',
            logo: 'https://images.prismic.io/sacra/dbc560bf-42bb-46f9-b3b3-0af6bd29d624_spaceX-Logo-tagline-slogan-motto-mission-vision-founder-owner.jpeg?auto=compress,format',
            description: 'Производство и запуск космической техники',
            tags: ['Aerospace', 'Late Stage'],
            valuation: '$127.00B',
            country: 'США',
            founded: 2002,
        },
        {
            name: 'Sift',
            logo: 'https://media.sift.com/app/uploads/2024/02/Sift-logo-1.png',
            description: 'Предотвращение цифрового мошенничества',
            tags: ['AI Tech', 'Late Stage'],
            valuation: '$1.18B',
            country: 'США',
            founded: 2011,
        },
        {
            name: 'Drip Capital',
            logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9NiWxy-EQKwi6boTV4E9EKiBxPIyt3RQ-DfP5MvdUzvjlIo93buZENfC8-6xwQEjtNm8&usqp=CAU',
            description: 'Онлайн-фиксирование международной торговли',
            tags: ['FinTech', 'Early Stage'],
            valuation: '$330.00M',
            country: 'США',
            founded: 2015,
        },
        {
            name: 'ConsenSys',
            logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_t-WflYK4jhQd65WaEV7y2fhkhz8JdbXZliw_o9hug95e1WeX2DYX4f28FphZfKMZpfQ&usqp=CAU',
            description: 'Разработка децентрализованых приложений',
            tags: ['FinTech', 'Late Stage'],
            valuation: '$7.07B',
            country: 'США',
            founded: 2013,
        },
        {
            name: 'StoreDot',
            logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJmVFDeQifcT8NemhXqrfB38YR-CfrfUcL5A&s',
            description: 'Производство аккумуляторов для электромобилей',
            tags: ['GreenTech', 'Early Stage'],
            valuation: '$1.2B',
            country: 'Израиль',
            founded: 2012,
        },
        {
            name: 'Rappi',
            logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD-HlMOc3oI_HV7PKdQwqBUf8Bm5VHujelBA&s',
            description: 'Онлайн маркетплейс и доставка товаров',
            tags: ['E-Commerce', 'Late Stage'],
            valuation: '$5.25B',
            country: 'Колумбия',
            founded: 2015,
        },
        {
            name: 'Patreon',
            logo: 'https://i0.wp.com/cedricstudio.com/wp-content/uploads/2016/10/patreon-logo-icon.jpg?fit=275%2C275&ssl=1',
            description: 'Платформа для поддержки создателей контента',
            tags: ['Media', 'Late Stage'],
            valuation: '$4.30B',
            country: 'США',
            founded: 2013,
        },
        {
            name: 'Scale AI',
            logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvUz8v8BYRk6WcEQvTsTOYfx0rAfCDw3Y39vrMww_2Un1MVLWZglxsJ-q7iOVimWi7utM&usqp=CAU',
            description: 'Маркировка больших данных и ML-моделей',
            tags: ['AI-Tech', 'Pre-IPO'],
            valuation: '$7.30B',
            country: 'США',
            founded: 2016,
        },
        {
            name: 'Klarna',
            logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdkit-ebco275ciSsys5VgL0tTfRcDv7w9Ow&s',
            description: 'Шопинг платформа с функцией отложенного платежа',
            tags: ['FinTech', 'Pre-IPO'],
            valuation: '$6.70B',
            country: 'Швеция',
            founded: 2005,
        },
        {
            name: 'Standard',
            logo: 'https://standard.ai/assets/images/logo.png',
            description: 'ПО на основе искуственного интелекта для ретейла',
            tags: ['AI-Tech', 'Early Stage'],
            valuation: '$1.00B',
            country: 'США',
            founded: 2017,
        },
        {
            name: 'Tradeshift',
            logo: 'https://pbs.twimg.com/profile_images/1542920208033226753/dcKxJX6k_400x400.png',
            description: 'Оцифровка счетов в международной торговле',
            tags: ['AI-Tech', 'Late Stage'],
            valuation: '$2.7B',
            country: 'США',
            founded: 2010,
        },
        {
            name: 'InVision',
            logo: 'https://cdn.worldvectorlogo.com/logos/invision.svg',
            description: 'Платформа для проектирования цифровых продуктов',
            tags: ['Design', 'Late Stage'],
            valuation: '$2.02B',
            country: 'США',
            founded: 2011,
        },
        {
            name: 'Kraken',
            logo: 'https://andsimple.co/wp-content/uploads/2022/03/kraken-logo.png',
            description: 'Одна из крупнейших криптовалютных бирж',
            tags: ['FinTech', 'Pre-IPO'],
            valuation: '$4.02B',
            country: 'США',
            founded: 2011,
        },
        {
            name: 'Better',
            logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYlVbrH9MeY8xiUVi_7bE3RqeVTFS2d_K7cQ&s',
            description: 'Онлайн-сопровождение ипотечных сделок',
            tags: ['PropTech', 'Pre-IPO'],
            valuation: '$4.51B',
            country: 'США',
            founded: 2014,
        },
        {
            name: 'Robinhood',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Robinhood_Logo.png',
            description: 'Приложение для торговли на бирже с нулевыми комиссиями',
            tags: ['FinTech', 'IPO'],
            valuation: '$29.33B',
            country: 'США',
            founded: 2013,
        },
        {
            name: 'Rubrick',
            logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTahBMMhSz5omHNkm5awLB0HhhDBtQJTl3dBQ&s',
            description: 'Защита облачных данных от киберугроз',
            tags: ['AI', 'IPO'],
            valuation: '$4.1B',
            country: 'США',
            founded: 2014,
        },
    ];

    return (
        <div className=" bg-white py-10">
            <div className=" mx-[100px] rounded-[70px]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {companies.map((company, index) => (
                        <div
                            key={index}
                            className="bg-white border border-gray-200 rounded-lg shadow-md p-6 relative"
                        >
                            <div className="absolute top-3 left-3 flex space-x-2">
                                {company.tags.map((tag, idx) => (
                                    <span
                                        key={idx}
                                        className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                                    >
                  {tag}
                </span>
                                ))}
                            </div>

                            <div className="flex items-center mt-5 mb-4">
                                <img
                                    src={company.logo}
                                    alt={`${company.name} logo`}
                                    className="w-[50px] h-[50px] rounded-full"
                                />
                                <div className="ml-4">
                                    <h3 className="text-xl text-black font-semibold">{company.name}</h3>
                                    <p className="text-sm text-gray-500">{company.description}</p>
                                </div>
                            </div>

                            <div className="border-t pt-4 mt-4  text-sm flex flex-row items-center w-full">
                                <div className="flex flex-col items-center w-[30%] border-r-[2px]">
                                    <span className="text-gray-500">Оценка</span>
                                    <span className="text-black font-semibold">{company.valuation}</span>
                                </div>
                                <div className="flex flex-col items-center w-[30%] border-r-[2px]">
                                    <span className="text-gray-500">Страна</span>
                                    <span className=" text-black font-semibold">{company.country}</span>
                                </div>
                                <div className="flex flex-col items-center w-[30%]">
                                    <span className="text-gray-500">Основана</span>
                                    <span className="text-black font-semibold">{company.founded}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}