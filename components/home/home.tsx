import {AboutUs} from "@/components/aboutus/aboutus";
import {Offer} from "@/components/offer";
import {TwoBlocks} from "@/components/twoblocks";
import {InviteBlock} from "@/components/inviteblock";
import {IpoInfoblock} from "@/components/ipo-infoblock";
import {Tarrifs} from "@/components/tarrifs/tarrifs";
import {MainFooter} from "@/components/main-footer";

interface Props{
    className?:string;
}

export const Home:React.FC<Props> = ({className}) => {
    return (
        <>
            <AboutUs/>
            <Offer/>
            <TwoBlocks/>
            <InviteBlock/>
            <IpoInfoblock/>
            <Tarrifs/>
            <MainFooter/>
        </>
    )
}