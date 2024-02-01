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
        return (
            <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4 my-10">
                <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
                    <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
                        Loading campaigns...
                    </h1>
                </div>
            </div>
        );
    }

    return (
        <div className="mt-10">
            {campaigns && campaigns?.length > 0 ? (
                <>
                    <h1 className="text-[18px]">All Campaigns</h1>

                    <DisplayCampaigns campaigns={campaigns} />
                </>
            ) : (
                <div className="text-[18px] text-white text-left">
                    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4 my-10">
                        <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
                            <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
                                No Campaigns Found. Try adding a new campaign.
                            </h1>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FetchCampaigns;
