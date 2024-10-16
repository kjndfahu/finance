import {IndexblockAbout} from "../../../../../components/aboutpage/indexblock-about";
import {AboutFirst} from "../../../../../components/aboutpage/aboutfirst";
import {ProssesAbout} from "../../../../../components/aboutpage/prosses-about";
import {MainFooter} from "../../../../../components/home/main-footer";
import React from "react";
import {ShortOperationTime} from "../../../../../components/aboutpage/shortoperationtime";
import {CapitalGainsAbout} from "../../../../../components/aboutpage/capitalgainsabout";
import {InvestIPOAbout} from "../../../../../components/aboutpage/investipo-about";
import {WhyProfitable} from "../../../../../components/aboutpage/whyprofitable";
import {Nocommissions} from "../../../../../components/aboutpage/nocommissions";
import {WhyInvestAbout} from "../../../../../components/aboutpage/whyinvest-about";
import {SelectoppAbout} from "../../../../../components/aboutpage/selectopp-about";
import {PrivateMarketsAbout} from "../../../../../components/aboutpage/privatemarkets-about";
import {SecondaryMarket} from "../../../../../components/aboutpage/secondarymarket";
import {GetAheadAbout} from "../../../../../components/aboutpage/getaheadabout";
import {routing} from "../../../../i18n/routing";
import {unstable_setRequestLocale} from "next-intl/server";

export function generateStaticParams() {
        return routing.locales.map((locale) => ({locale}));
}


export default async function AboutUsPage({params}) {
        unstable_setRequestLocale(params.locale);
    return (
        <div className="flex flex-col bg-[#FFFFFF] mdbvp:px-[100px] pt-[100px] smbvp:px-[30px] px-[10px]">
            <AboutFirst/>
            <IndexblockAbout/>
            <ProssesAbout/>
            <PrivateMarketsAbout/>
            <WhyInvestAbout/>
            <SelectoppAbout/>
            <GetAheadAbout/>
            <SecondaryMarket/>
            <Nocommissions/>
            <InvestIPOAbout/>
            <WhyProfitable/>
            <CapitalGainsAbout/>
            <ShortOperationTime/>
            <MainFooter/>
        </div>
    )
}