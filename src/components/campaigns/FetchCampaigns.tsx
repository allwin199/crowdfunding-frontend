"use client";

import { useEffect, useState } from "react";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import DisplayCampaigns from "./DisplayCampaigns";
import { deployedContract } from "@/constants/index";

type CampaignTypes = {
    id: number;
    creator: string;
    name: string;
    description: string;
    targetAmount: string;
    endAt: number;
    amountCollected: string;
    image: string;
    claimedByOwner: boolean;
};

const FetchCampaigns = () => {
    const [campaigns, setCampaigns] = useState<CampaignTypes[]>();

    const { contract } = useContract(deployedContract);

    const {
        data: allCampaigns,
        isLoading: isCampaignsLoading,
        isSuccess,
    } = useContractRead(contract, "getCampaigns");

    useEffect(() => {
        if (isSuccess) {
            const campaigns = allCampaigns.map((campaign: CampaignTypes) => ({
                id: campaign.id,
                creator: campaign.creator,
                name: campaign.name,
                description: campaign.description,
                targetAmount: ethers.utils.formatEther(
                    campaign.targetAmount.toString()
                ),
                endAt: Number(campaign.endAt),
                amountCollected: ethers.utils.formatEther(
                    campaign.amountCollected.toString()
                ),
                image: campaign.image,
                claimedByOwner: campaign.claimedByOwner,
            }));
            setCampaigns(campaigns.reverse());
            // console.log("parsedCampaigns", campaigns);
        }
    }, [isSuccess, allCampaigns]);

    if (isCampaignsLoading) {
        return <div className="mt-10">Loading Campaigns...</div>;
    }

    return (
        <div className="mt-10">
            {campaigns && campaigns?.length > 0 ? (
                <>
                    <h1 className="text-[18px]">All Campaigns</h1>

                    <DisplayCampaigns campaigns={campaigns} />
                </>
            ) : (
                <h1 className="text-[18px] text-white text-left">
                    No Campaigns Found. Try adding a new campaign.
                </h1>
            )}
        </div>
    );
};

export default FetchCampaigns;
