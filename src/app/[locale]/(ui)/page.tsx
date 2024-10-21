import {routing} from "../../../i18n/routing";
import {AboutUs} from "../../../../components/home/aboutus/aboutus";
import {Offer} from "../../../../components/home/offer";
import {TwoBlocks} from "../../../../components/home/twoblocks";
import {InviteBlock} from "../../../../components/home/inviteblock";
import {IpoInfoblock} from "../../../../components/home/ipo-infoblock";
import {Tarrifs} from "../../../../components/home/tarrifs/tarrifs";
import {MainFooter} from "../../../../components/home/main-footer";
import {getServerSession} from "next-auth";
import {authOptions} from "../../../../utils/authOptions";
import {unstable_setRequestLocale} from "next-intl/server";


export function generateStaticParams() {
    return routing.locales.map((locale) => ({locale}));
}

export default async function HomePage({params}) {
    unstable_setRequestLocale(params.locale);
    const session = await getServerSession(authOptions)
    console.log(session)
    return (
        <div className="flex flex-col bg-[#FFFFFF] xl:px-[100px] px-[25px] pt-[100px]">
            <AboutUs session={session}/>
            <Offer/>
            <TwoBlocks session={session}/>
            <InviteBlock session={session}/>
            <IpoInfoblock session={session}/>
            <Tarrifs/>
            <MainFooter session={session}/>
        </div>
    );
}