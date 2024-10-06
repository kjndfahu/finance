import {PortfolioIconsBlock} from "../../../../../components/portfolio-component/portfolio-icons-block";
import {TitlePortfolio} from "../../../../../components/portfolio-component/title-portfolio";
import {SuccesfullIPO} from "../../../../../components/portfolio-component/succesfullipo";
import {VenchurPortfolio} from "../../../../../components/portfolio-component/venchur-portfolio";


export default function Portfolio() {
    return (
        <div className="flex flex-col bg-[#FDFEFE] w-full ">
            <TitlePortfolio/>
            <PortfolioIconsBlock/>
            <VenchurPortfolio/>
            <SuccesfullIPO/>
        </div>
    )
}
