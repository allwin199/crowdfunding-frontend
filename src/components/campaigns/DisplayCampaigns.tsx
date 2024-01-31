"use client";

import { useContract, useContractRead, useAddress } from "@thirdweb-dev/react";
import { ethers } from "ethers";

const DisplayCampaigns = () => {
    const address = useAddress();

    const { contract } = useContract(
        "0xb3Ee0a7A4DB0aC498eeE1510708D06C73d8c42f0"
    );

    const { data: allCampaigns, isLoading: isCampaignsLoading } =
        useContractRead(contract, "getCampaigns");

    if (isCampaignsLoading) {
        return <div className="mt-10">Loading Campaigns...</div>;
    }

    if (!isCampaignsLoading) {
        console.log("Data", allCampaigns);
    }

    return (
        <div className="mt-10">
            <h1 className="text-[18px] text-white text-left">All Campaigns</h1>
        </div>
    );
};

export default DisplayCampaigns;
