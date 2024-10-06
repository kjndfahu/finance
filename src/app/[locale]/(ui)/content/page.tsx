import {ContentAbout} from "../../../../../components/content-components/content-about";
import {ConsultantsGroup} from "../../../../../components/content-components/consultants-group";
import {CorporateStructure} from "../../../../../components/content-components/corporate-structure";
import {MainFooter} from "../../../../../components/home/main-footer";
import {ContentInfo} from "../../../../../components/content-components/content-info";


export default function Content() {
    return (
        <div className="flex flex-col bg-[#FFFFFF] px-[100px] py-[120px]">
            <ContentAbout/>
            <ConsultantsGroup/>
            <CorporateStructure/>
            <MainFooter/>
            <ContentInfo/>
        </div>
    )
}
