import Link from "next/link";
import { daysLeft } from "@/utils";

type CampaignTypes = {
    id: number;
    creator: string;
    name: string;
    description: string;
    targetAmount: string;
    endAt: number;
    amountCollected: string;
    amountClaimed: string;
    image: string;
    claimedByOwner: boolean;
};

type CampaignProps = {
    campaigns: CampaignTypes[];
};

const DisplayCampaigns = ({ campaigns }: CampaignProps) => {
    // console.log("Campaigns", campaigns[0]);

    const campaignCreator = (address: string) => {
        const slice1 = address.slice(0, 6);
        const slice2 = address.slice(-4);

        return slice1 + "..." + slice2;
    };

    return (
        <div className="grid grid-cols-4 gap-10 my-6">
            {campaigns.map((campaign) => (
                <Link href={`/campaigns/${campaign.id}`} key={campaign.id}>
                    <div className="rounded-[15px] bg-[#3a3a43] cursor-pointer text-sm">
                        <img
                            src={campaign.image}
                            alt="fund"
                            className="w-full h-[158px] object-cover rounded-[15px]"
                        />
                        <div className="p-4">
                            <div className="block">
                                <h3 className="text-base text-left leading-[26px] truncate">
                                    {campaign.name}
                                </h3>
                                <p className="mt-[5px] font-epilogue font-normal text-[#808191] text-left leading-[18px] truncate">
                                    {campaign.description}
                                </p>
                            </div>
                            <div className="flex justify-between flex-wrap mt-[15px] gap-2">
                                <div className="flex flex-col">
                                    <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">
                                        {campaign.claimedByOwner
                                            ? campaign.amountClaimed
                                            : campaign.amountCollected}
                                    </h4>
                                    <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
                                        Raised of {campaign.targetAmount} ETH
                                    </p>
                                </div>
                                <div className="flex flex-col">
                                    {daysLeft(campaign.endAt) < 0 ? (
                                        <p className="text-sm text-gray-400">
                                            Ended
                                        </p>
                                    ) : (
                                        <>
                                            <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">
                                                {daysLeft(campaign.endAt)}
                                            </h4>
                                            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
                                                Days Left
                                            </p>{" "}
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center mt-[20px] gap-[12px]">
                                <p className="flex-1 font-epilogue font-normal text-[12px] text-[#808191] truncate">
                                    Create by{" "}
                                    <span className="text-[#b2b3bd]">
                                        {campaignCreator(campaign.creator)}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default DisplayCampaigns;
