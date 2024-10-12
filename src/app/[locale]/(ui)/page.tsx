import {routing} from "../../../i18n/routing";
import {AboutUs} from "../../../../components/home/aboutus/aboutus";
import {Offer} from "../../../../components/home/offer";
import {TwoBlocks} from "../../../../components/home/twoblocks";
import {InviteBlock} from "../../../../components/home/inviteblock";
import {IpoInfoblock} from "../../../../components/home/ipo-infoblock";
import {Tarrifs} from "../../../../components/home/tarrifs/tarrifs";
import {MainFooter} from "../../../../components/home/main-footer";
export function generateStaticParams() {
    return routing.locales.map((locale) => ({locale}));
}


export default function HomePage() {
    return (
        <div className="flex flex-col bg-[#FFFFFF] xl:px-[100px] px-[25px] py-[100px] ">
            <AboutUs/>
            <Offer/>
            <TwoBlocks/>
            <InviteBlock/>
            <IpoInfoblock/>
            <Tarrifs/>
            <MainFooter/>
        </div>
    );
}