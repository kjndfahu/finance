import {ForPartners} from "../../../../../components/invite-earn-components/forpartners";
import {Whatdoyouget} from "../../../../../components/invite-earn-components/whatdoyouget";
import {ProgrammInfo} from "../../../../../components/invite-earn-components/programminfo";
import {MainFooter} from "../../../../../components/home/main-footer";


export default function InviteAndEarn() {
    return (
        <div className="flex flex-col bg-[#FFFFFF] mdbvp:px-[100px] px-[30px] pt-[100px]">
            <ForPartners/>
            <Whatdoyouget/>
            <ProgrammInfo/>
            <MainFooter/>
        </div>
    )
}