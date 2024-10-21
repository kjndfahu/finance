import {ForPartners} from "../../../../../components/invite-earn-components/forpartners";
import {Whatdoyouget} from "../../../../../components/invite-earn-components/whatdoyouget";
import {ProgrammInfo} from "../../../../../components/invite-earn-components/programminfo";
import {MainFooter} from "../../../../../components/home/main-footer";
import {routing} from "../../../../i18n/routing";
import {unstable_setRequestLocale} from "next-intl/server";
import {getServerSession} from "next-auth";
import {authOptions} from "../../../../../utils/authOptions";

export function generateStaticParams() {
    return routing.locales.map((locale) => ({locale}));
}


export default async function InviteAndEarn({params}) {
    unstable_setRequestLocale(params.locale);
    const session = await getServerSession(authOptions)
    return (
        <div className="flex flex-col bg-[#FFFFFF] mdbvp:px-[100px] px-[10px] pt-[100px]">
            <ForPartners/>
            <Whatdoyouget/>
            <ProgrammInfo/>
            <MainFooter session={session}/>
        </div>
    )
}