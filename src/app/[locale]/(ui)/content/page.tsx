import {ContentAbout} from "../../../../../components/content-components/content-about";
import {ConsultantsGroup} from "../../../../../components/content-components/consultants-group";
import {CorporateStructure} from "../../../../../components/content-components/corporate-structure";
import {MainFooter} from "../../../../../components/home/main-footer";
import {ContentInfo} from "../../../../../components/content-components/content-info";
import {routing} from "../../../../i18n/routing";
import {unstable_setRequestLocale} from "next-intl/server";
import {getServerSession} from "next-auth";
import {authOptions} from "../../../../../utils/authOptions";

export function generateStaticParams() {
    return routing.locales.map((locale) => ({locale}));
}


export default async function Content({params}) {
    unstable_setRequestLocale(params.locale);
    const session = await getServerSession(authOptions)
    return (
        <div className="flex flex-col bg-[#FFFFFF] mdbvp:px-[100px] px-[40px] pt-[100px]">
            <ContentAbout session={session}/>
            <ConsultantsGroup/>
            <CorporateStructure/>
            <MainFooter session={session}/>
            <ContentInfo/>
        </div>
    )
}
