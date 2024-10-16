import {PortfolioIconsBlock} from "../../../../../components/portfolio-component/portfolio-icons-block";
import {TitlePortfolio} from "../../../../../components/portfolio-component/title-portfolio";
import {SuccesfullIPO} from "../../../../../components/portfolio-component/succesfullipo";
import {VenchurPortfolio} from "../../../../../components/portfolio-component/venchur-portfolio";
import {routing} from "../../../../i18n/routing";
import {unstable_setRequestLocale} from "next-intl/server";
export function generateStaticParams() {
    return routing.locales.map((locale) => ({locale}));
}

export default async function Portfolio({params}) {
    unstable_setRequestLocale(params.locale);
    return (
        <div className="flex flex-col bg-[#FDFEFE] w-full ">
            <TitlePortfolio/>
            <PortfolioIconsBlock/>
            <VenchurPortfolio/>
            <SuccesfullIPO/>
        </div>
    )
}
