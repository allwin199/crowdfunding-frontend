"use client";

import { useContract, useContractRead } from "@thirdweb-dev/react";
import { ethers } from "ethers";

type FetchCampaignPropTypes = {
    id: string;
};

const FetchCampaign = ({ id }: FetchCampaignPropTypes) => {
    const { contract } = useContract(
        "0xb3Ee0a7A4DB0aC498eeE1510708D06C73d8c42f0"
    );

    const {
        data: campaign,
        isLoading,
        isSuccess,
    } = useContractRead(contract, "getCampaign", [id]);

    if (isLoading) {
        return (
            <div className="mt-10">
                <h1>Campaign Loading ...</h1>
            </div>
        );
    }

    const daysLeft = (deadline: number) => {
        const difference = new Date(deadline).getTime() - Date.now();
        const remainingDays = difference / (1000 * 3600 * 24);

        if (+remainingDays.toFixed(0) === -0) {
            return 1;
        }

        return remainingDays.toFixed(0);
    };

    if (isSuccess) {
        // console.log(campaign);
        return (
            <div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <img
                            src={campaign.image}
                            alt="campaign"
                            className="w-full h-[330px] object-cover rounded-xl"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4 my-2">
                        {daysLeft(Number(campaign.endAt)) == "-1" ? (
                            <div className="bg-[#222222] rounded p-6 flex items-center justify-center">
                                <h2>Campaign Already Ended</h2>
                            </div>
                        ) : (
                            <div className="bg-[#222222] rounded p-6">
                                Days Left
                                <p className="text-sm mt-4">
                                    {daysLeft(Number(campaign.endAt))}
                                </p>
                            </div>
                        )}
                        <div className="bg-[#222222] rounded p-6">
                            Target Amount
                            <p className="text-sm mt-4">
                                {ethers.utils.formatEther(
                                    campaign.targetAmount.toString()
                                )}{" "}
                                ETH
                            </p>
                        </div>
                        <div className="bg-[#222222] rounded p-6">
                            Amount Collected
                            <p className="text-sm mt-4">
                                {ethers.utils.formatEther(
                                    campaign.amountCollected.toString()
                                )}{" "}
                                ETH
                            </p>
                        </div>
                        <div className="bg-[#222222] rounded p-6">
                            Total Funders
                            <p className="text-sm mt-4">
                                {campaign.funders.length}
                            </p>
                        </div>

                        <div className="col-span-2">
                            {daysLeft(Number(campaign.endAt)) == "-1" ? (
                                <div className="flex items-center justify-center bg-[#0041c2] rounded">
                                    <button className="text-center py-3">
                                        Withdraw
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center bg-[#0041c2] rounded">
                                    <button className="text-center py-3">
                                        Fund Campaign
                                    </button>
                                </div>
                            )}
                        </div>
                        {/* <div className="col-span-2">
                            <div className="flex items-center justify-center bg-[#0041c2] rounded">
                                <button className="text-center py-3">
                                    Fund Campaign
                                </button>
                            </div>
                        </div> */}
                    </div>
                </div>
                <div className="mt-6">
                    <div>
                        <h4 className="text-xl">Creator</h4>
                        <span className="text-sm text-gray-400">
                            {campaign.creator}
                        </span>
                    </div>
                    <div className="mt-6">
                        <h4 className="text-xl">Description</h4>
                        <span className="text-sm text-gray-400">
                            {campaign.description}
                        </span>
                    </div>
                    {campaign.funders.length > 0 ? (
                        <div className="mt-6">
                            <h4 className="text-xl">Funders</h4>
                            <span className="text-sm text-gray-400">
                                {/* {campaign.funders.map((funder) => (
                                    <div key={funder}>{funder}</div>
                                ))} */}
                            </span>
                        </div>
                    ) : null}
                </div>
            </div>

            // <div className="w-full mt-10 gap-[30px]">
            //     <div>
            //             <img
            //                 src={campaign.image}
            //                 alt="campaign"
            //                 className="w-full h-[250px] object-cover rounded-xl"
            //             />

            //         </div>

            //         <div className="grid grid-cols-3 gap-4">
            //             <div className="col-span-1">
            //                 <h4 className="font-epilogue font-bold text-[30px] text-white p-3 bg-[#1c1c24] rounded-t-[10px] w-full text-center truncate">
            //                     {daysLeft(Number(campaign.endAt))}
            //                 </h4>
            //                 <p className="font-epilogue font-normal text-[16px] text-[#808191] bg-[#28282e] px-3 py-2 w-full rouned-b-[10px] text-center">
            //                     Days Left
            //                 </p>
            //             </div>
            //             <div className="col-span-1">
            //                 <h4 className="font-epilogue font-bold text-[30px] text-white p-3 bg-[#1c1c24] rounded-t-[10px] w-full text-center truncate">
            //                     {ethers.utils.formatEther(
            //                         campaign.amountCollected.toString()
            //                     )}
            //                 </h4>
            //                 <p className="font-epilogue font-normal text-[16px] text-[#808191] bg-[#28282e] px-3 py-2 w-full rouned-b-[10px] text-center">
            //                     Raised of{" "}
            //                     {ethers.utils.formatEther(
            //                         campaign.targetAmount.toString()
            //                     )}
            //                 </p>
            //             </div>
            //             <div className="">
            //                 <h4 className="font-epilogue font-bold text-[30px] text-white p-3 bg-[#1c1c24] rounded-t-[10px] w-full text-center truncate">
            //                     {campaign.funders.length}
            //                 </h4>
            //                 <p className="font-epilogue font-normal text-[16px] text-[#808191] bg-[#28282e] px-3 py-2 w-full rouned-b-[10px] text-center">
            //                     Funders
            //                 </p>
            //             </div>
            //         </div>
            //     </div>

            //     <div className="flex">
            //         <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
            //             <div className="flex-[2] flex flex-col gap-[40px]">
            //                 <div>
            //                     <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
            //                         Creator
            //                     </h4>

            //                     <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
            //                         <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">
            //                             {campaign.creator}
            //                         </h4>
            //                     </div>
            //                 </div>

            //                 <div>
            //                     <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
            //                         Story
            //                     </h4>

            //                     <div className="mt-[20px]">
            //                         <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
            //                             {campaign.description}
            //                         </p>
            //                     </div>
            //                 </div>

            //                 <div>
            //                     <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
            //                         Funders
            //                     </h4>

            //                     {/* <div className="mt-[20px] flex flex-col gap-4">
            //                     {campaign.funders.length > 0 ? (
            //                         campaign.funders.map((funder, index) => (
            //                             <div
            //                                 key={`${item.donator}-${index}`}
            //                                 className="flex justify-between items-center gap-4"
            //                             >
            //                                 <p className="font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-ll">
            //                                     {index + 1}. {item.donator}
            //                                 </p>
            //                                 <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] break-ll">
            //                                     {item.donation}
            //                                 </p>
            //                             </div>
            //                         ))
            //                     ) : (
            //                         <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
            //                             No donators yet. Be the first one!
            //                         </p>
            //                     )}
            //                 </div> */}
            //                 </div>
            //             </div>
            //         </div>
            //     </div>
            //     </div>
            // </div>
        );
    }
};

export default FetchCampaign;
