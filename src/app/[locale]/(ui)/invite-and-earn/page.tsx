import {ForPartners} from "../../../../../components/invite-earn-components/forpartners";
import {Whatdoyouget} from "../../../../../components/invite-earn-components/whatdoyouget";
import {ProgrammInfo} from "../../../../../components/invite-earn-components/programminfo";
import {MainFooter} from "../../../../../components/home/main-footer";


export default function InviteAndEarn() {
    return (
        <div className="flex flex-col bg-[#FFFFFF] px-[100px] py-[120px]">
            <ForPartners/>
            <Whatdoyouget/>
            <ProgrammInfo/>
            <MainFooter/>
        </div>
    )
}