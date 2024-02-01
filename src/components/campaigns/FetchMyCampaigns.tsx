"use client";

import { useEffect, useState } from "react";
import { useContract, useContractRead, useAddress } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import DisplayCampaigns from "./DisplayCampaigns";

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

const FetchMyCampaigns = () => {
    const [campaigns, setCampaigns] = useState<CampaignTypes[]>();
    const address = useAddress();

    const { contract } = useContract(
        "0xb3Ee0a7A4DB0aC498eeE1510708D06C73d8c42f0"
    );

    const {
        data: allCampaigns,
        isLoading: isCampaignsLoading,
        isSuccess,
    } = useContractRead(contract, "getCampaigns");

    useEffect(() => {
        if (!address) {
            setCampaigns([]);
        } else {
            if (isSuccess) {
                const myCampaigns = allCampaigns.filter(
                    (campaign: CampaignTypes) => campaign.creator === address
                );
                const campaigns = myCampaigns.map(
                    (campaign: CampaignTypes) => ({
                        id: Number(
                            ethers.utils.formatEther(campaign.id.toString())
                        ),
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
                    })
                );
                setCampaigns(campaigns.reverse());
                // console.log("parsedCampaigns", campaigns);
            }
        }
    }, [isSuccess, allCampaigns, address]);

    if (isCampaignsLoading) {
        return <div className="mt-10">Loading Campaigns...</div>;
    }

    if (!address) {
        return (
            <div className="mt-10">
                <h1>Connect your wallet to see your campaigns</h1>
            </div>
        );
    }

    return (
        <div className="mt-10">
            {campaigns && campaigns?.length > 0 ? (
                <>
                    <h1 className="text-[18px]">My Campaigns</h1>

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

export default FetchMyCampaigns;
