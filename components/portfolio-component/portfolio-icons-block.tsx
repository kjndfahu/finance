export const PortfolioIconsBlock:React.FC = () => {
    const companies = [
        { name: 'MSFT', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png' },
        { name: 'CVX', logo: 'https://static.stocktitan.net/company-logo/cvx.png' },
        { name: 'HCA', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9md_r3Ffzs3F5mulET9jZW3PASWLTGjBb6A&s' },
        { name: 'EQIX', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-8-moKqDTXMnjzph8zQAAfsONEy-Qypx_Hw&s' },
        { name: 'AON', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRftMd5h0dJS9ffnWI7RogajjgNaBOUzzLDsRE4PmPu-WNy0p6RRJUB1k_MEOU2S_sdkPk&usqp=CAU' },
        { name: 'MNST', logo: 'https://static.stocktitan.net/company-logo/mnst.png' },
        { name: 'PAYX', logo: 'https://cdn.icon-icons.com/icons2/2699/PNG/512/paychex_logo_icon_170867.png' },


        { name: 'AAPL', logo: 'https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8ed3d547-94ff-48e1-9f20-8c14a7030a02_2000x2000.jpeg' },
        { name: 'NFLX', logo: 'https://images.ctfassets.net/y2ske730sjqp/5QQ9SVIdc1tmkqrtFnG9U1/de758bba0f65dcc1c6bc1f31f161003d/BrandAssets_Logos_02-NSymbol.jpg?w=940' },
        { name: 'FI', logo: 'https://crystalpng.com/wp-content/uploads/2023/03/fiserv-logo.png' },
        { name: 'CEG', logo: 'https://logosandtypes.com/wp-content/uploads/2021/04/Constellation.png' },
        { name: 'NOC', logo: 'https://technical.ly/wp-content/uploads/2013/12/Northrup-Grumman-logo-Twitter.jpg' },
        { name: 'COF', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9TLo0ylDL3HJ7aCFR0kkvAhN2xwjVzhV_wQ&s' },
        { name: 'FTNT', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6AHYfMfImxP0svUUs0uzJXRHVXz46uJaTVQ&s' },

        { name: 'NVDA', logo: 'https://www.aljazeera.com/wp-content/uploads/2024/08/AFP__20211224__631007442__v2__HighRes__LatestConsumerTechnologyProductsOnDisplayAtCe-3-1722477274.jpg?resize=1920%2C1080' },
        { name: 'KO', logo: 'https://companieslogo.com/img/orig/KO-b23a2a5e.png?t=1720244492' },
        { name: 'GILD', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf53AOrKbDIgt_kWrrRRWiIxd899ZSnnJiUg&s' },
        { name: 'MAR', logo: 'https://i.pinimg.com/736x/e1/78/6e/e1786e79b5287e0d6bca2104a8540e5a.jpg' },
        { name: 'FDX', logo: 'https://static.stocktitan.net/company-logo/fdx-lg.png' },
        { name: 'AFL', logo: 'https://i0.wp.com/mmgsuccess.blog/wp-content/uploads/2017/06/Aflac-Logo-MC-spon1.png?fit=200%2C200&ssl=1' },
        { name: 'GWW', logo: 'https://static.stocktitan.net/company-logo/gww.png' },
        { name: 'GOOGL', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png' },
        { name: 'AMD', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyFm81w3E1j95lXupWAYvgRPafowCRkIpvWw&s' },
        { name: 'BMY', logo: 'https://pbs.twimg.com/profile_images/1807725439676276736/cpraVA2Q_400x400.jpg' },
        { name: 'CME', logo: 'https://pbs.twimg.com/profile_images/1323731057867411456/sCeGYwfP_400x400.jpg' },
        { name: 'USB', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrDg8f7R0-qjTQ1xDHT0RHCtp7iPYSq23OJg&s' },
        { name: 'PSA', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQADB6STAz5p-fRtmUN9zCqtj0vjVBKFg99KQ&s' },
        { name: 'KMI', logo: 'https://pbs.twimg.com/profile_images/423508102567051264/bw8gxUg6_400x400.png' },

        { name: 'GOOG', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png' },
        { name: 'ADBE', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy-7cp-XgH4R63l3X63DWb0fkZzyioOC9rIw&s' },
        { name: 'S0', logo: 'https://companieslogo.com/img/orig/SO-bc44012c.png?t=1720244494' },
        { name: 'NXPI', logo: 'https://static.stocktitan.net/company-logo/nxpi.png' },
        { name: 'ORLY', logo: 'https://e7.pngegg.com/pngimages/218/520/png-clipart-car-logo-o-reilly-auto-parts-closed-autozone-car.png' },
        { name: 'MET', logo: 'https://archive.org/services/img/metlife-new-logo-500' },
        { name: 'BK', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp-7ZXabFGfFbwH_DU4txt6gOx244AymFJZg&s' },
        { name: 'AMZN', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwjHOFq3kburfbkWsIM0hi0bbwteu1wQ75Fw&s' },
        { name: 'CRM', logo: 'https://www.bedirect-online.de/wp-content/uploads/2024/06/logo-salesforce.png' },
        { name: 'WM', logo: 'https://s3-symbol-logo.tradingview.com/waste-management--600.png' },
        { name: 'ECL', logo: 'https://g.foolcdn.com/art/companylogos/square/ecl.png' },
        { name: 'PYPL', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxcip31fxBC7WvSHxj-XZmatuHOUQTopxmAw&s' },
        { name: 'VLO', logo: 'https://purepng.com/public/uploads/large/purepng.com-valero-energy-logologobrand-logoiconslogos-251519939199xwdd4.png' },
        { name: 'DXCM', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgNqwmDd8JQBWlPxjq0CrVUs9q3ef-h_MmEg&s' },
        { name: 'META', logo: 'https://signsalad.com/wp-content/uploads/2021/11/Screenshot-2021-11-03-at-12.14.11.png' },
        { name: 'PEP', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQav_FKU3p177EcfeBO3T_hYttXckMwxoREkw&s' },
        { name: 'CDNS', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKqx_P5du4N9m_TyQdh_Chwq5ks7ty9qLsTw&s' },
        { name: 'SLB', logo: 'https://i0.wp.com/utahforge.com/wp-content/uploads/2023/11/schlumberger-logo-200px.png?fit=200%2C200&ssl=1' },
        { name: 'MPC', logo: 'https://img.favpng.com/13/17/25/marathon-oil-chevron-corporation-marathon-petroleum-corporation-logo-png-favpng-vc23yfeCJ1RpYMP7yJt4138w9.jpg' },
        { name: 'AZO', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMRGYwjPjYYLzvI_WPMFWKEpKTUZwtBvW_NQ&s' },
        { name: 'AMP', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOUGT1oIRt249fvK1-dzN6AGSQbT6BbIke7A&s' },
        { name: 'BRK.B', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThlElSYKhM9hZxdC4Y09Sc38f2dCw8Gu-Zgg&s' },
        { name: 'QCOM', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh8DUrLHNP-c4OFE4qZZg7AQ7ywnpceLJ6Jw&s' },
        { name: 'APH', logo: 'https://s3-symbol-logo.tradingview.com/amphenol--600.png' },
        { name: 'TGT', logo: 'https://g.foolcdn.com/art/companylogos/square/tgt.png' },
        { name: 'EMR', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5emDa_HvXk78w6PnLxavxsUzTeMumm5hukA&s' },
        { name: 'GEV', logo: 'https://companieslogo.com/img/orig/GEV-e06a174f.png?t=1720244492' },
        { name: 'HUM', logo: 'https://crystalpng.com/wp-content/uploads/2023/05/humana-logo.png' },
        { name: 'LLY', logo: 'https://g.foolcdn.com/art/companylogos/square/lly.png' },
        { name: 'TMO', logo: 'https://dwglogo.com/wp-content/uploads/2019/02/1650px_Thermo_Fisher_Scientific_logo.png' },
        { name: 'GD', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8PknuyaGVJ-GIkrpBwLBzzynZ5SQrHv1oQuMtvsGcNQmYEgIWEj_tWDyYoZT1O8-bCbY&usqp=CAU' },
        { name: 'BDX', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDXtVj1US4nFji7vPGbjucrTcy5NCQ7Njj5Q&s' },
        { name: 'RSG', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXL-U_BgYh5Z0yyUuaMxQ6CBCUbs3oLs_8_A&s' },
        { name: 'TFC', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeGhMKO8KWYic9nU8eiN1qGCZDUaWzL8oCbw&s' },
        { name: 'URI', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9gJDCWGvRwoxMiuh7z21g9tFJCJXyssMkig&s' },

        { name: 'AVGO', logo: 'https://pbs.twimg.com/profile_images/784468765027110912/tavuddvl_400x400.jpg' },
        { name: 'LIN', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrcwRiEzmIEH3knx7g0uJgZlnGB-bUTcm59w&s' },
        { name: 'CL', logo: 'https://s3-symbol-logo.tradingview.com/colgate-palmolive--600.png' },
        { name: 'MSI', logo: 'https://companieslogo.com/img/orig/MSI-7283da32.png?t=1720244493' },
        { name: 'PNC', logo: 'https://ik.imagekit.io/kkbzr2uz4cp/stock/nyse/pnc.png' },
        { name: 'ROST', logo: 'https://s3-symbol-logo.tradingview.com/ross-stores--600.png' },
        { name: 'LHX', logo: 'https://static.stocktitan.net/company-logo/lhx.png' },
        { name: 'TSLA', logo: 'https://s3-symbol-logo.tradingview.com/tesla--600.png' },
        { name: 'TMUS', logo: 'https://s3-symbol-logo.tradingview.com/t-mobile--600.png' },
        { name: 'MO', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd1_RGwwNahcjzue6ZOBF75W9TgbNK0CaJ4A&s' },
        { name: 'PH', logo: 'https://media.licdn.com/dms/image/v2/C560BAQGXWJhpgzqTFw/company-logo_200_200/company-logo_200_200/0/1631339624013?e=2147483647&v=beta&t=VEAWtLD6b6zuP7McaE1RZJlU5sTUeMiLZ6Cp2Q-WQFY' },
        { name: 'WELL', logo: 'https://storage.googleapis.com/5paisa-prod-storage/pages/us_stock_logos/us_stock_logos/1405111_profilepicture.png' },
        { name: 'AIG', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBaNy9LVtBhOYQ-yfSLb0sHFb24tvGAARZSQ&s' },
        { name: 'PRU', logo: 'https://s3-symbol-logo.tradingview.com/prudential--600.png' },
    ];
    return (
        <div className="min-h-screen py-[50px] bg-white flex justify-center items-center">
            <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-7 gap-4 ">
                {companies.map((company, index) => (
                    <div className="flex flex-row items-center text-black gap-3" key={index}>
                        <img key={index} className="rounded-full w-[50px] h-[50px]" src={company.logo} alt="logo"/>
                        <div className="bg-[#f5f5f5] text-[18px] font-semibold px-7 py-1 rounded-[5px]">
                            <h3>{company.name}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}