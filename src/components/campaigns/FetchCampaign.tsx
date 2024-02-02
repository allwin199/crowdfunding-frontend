"use client";

import { useState } from "react";
import { useContract, useContractRead, useAddress } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { deployedContract } from "@/constants/index";
import { daysLeft } from "@/utils";

type FetchCampaignPropTypes = {
    id: string;
};

const FetchCampaign = ({ id }: FetchCampaignPropTypes) => {
    const [amount, setAmount] = useState(0);
    const [isFunding, setIsFunding] = useState(false);
    const [iswithdaw, SetIsWithdraw] = useState(false);
    const { contract } = useContract(deployedContract);
    const address = useAddress();

    const {
        data: campaign,
        isLoading,
        isSuccess,
        refetch,
    } = useContractRead(contract, "getCampaign", [id]);

    const fundTheCampaign = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (amount == 0) {
            alert("Cannot fund with 0");
        } else {
            setIsFunding(true);
            const amountInWei = ethers.utils.parseEther(amount.toString());
            try {
                const data = await contract?.call("fundCampaign", [id], {
                    value: amountInWei,
                });
                console.info("contract call successs", data);
                refetch();
                setAmount(0);
            } catch (err) {
                console.error("contract call failure", err);
            } finally {
                setIsFunding(false);
            }
        }
    };

    const withdraw = async () => {
        SetIsWithdraw(true);
        try {
            const data = await contract?.call("withdraw", [id]);
            console.info("contract call successs", data);
            refetch();
        } catch (err) {
            console.error("contract call failure", err);
        } finally {
            SetIsWithdraw(false);
        }
    };

    if (isLoading) {
        return (
            <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4 my-10">
                <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
                    <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
                        Campaign Loading...
                    </h1>
                </div>
            </div>
        );
    }

    if (isSuccess) {
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
                        {daysLeft(Number(campaign.endAt)) < 0 ? (
                            <div className="bg-[#222222] rounded p-6 flex items-center justify-center">
                                <h2>Campaign Ended</h2>
                            </div>
                        ) : (
                            <div className="bg-[#222222] rounded p-4">
                                Days Left
                                <p className="text-sm mt-4">
                                    {daysLeft(Number(campaign.endAt))}
                                </p>
                            </div>
                        )}
                        <div className="bg-[#222222] rounded p-4">
                            Target Amount
                            <p className="text-sm mt-4">
                                {ethers.utils.formatEther(
                                    campaign.targetAmount.toString()
                                )}{" "}
                                ETH
                            </p>
                        </div>
                        {campaign.claimedByOwner ? (
                            <div className="bg-[#222222] rounded p-4">
                                Amount Claimed
                                <p className="text-sm mt-4">
                                    {ethers.utils.formatEther(
                                        campaign.amountWithdrawnByOwner.toString()
                                    )}{" "}
                                    ETH
                                </p>
                            </div>
                        ) : (
                            <div className="bg-[#222222] rounded p-4">
                                Amount Collected
                                <p className="text-sm mt-4">
                                    {ethers.utils.formatEther(
                                        campaign.amountCollected.toString()
                                    )}{" "}
                                    ETH
                                </p>
                            </div>
                        )}
                        <div className="bg-[#222222] rounded p-4">
                            Total Funders
                            <p className="text-sm mt-4">
                                {campaign.funders.length}
                            </p>
                        </div>

                        {address ? (
                            <div className="col-span-2">
                                <div className="flex mt-2">
                                    {campaign.creator === address ? (
                                        <div className="flex flex-1">
                                            {!iswithdaw &&
                                            campaign.claimedByOwner ? (
                                                <div className="text-center py-3 flex-1 bg-gray-500 items-center justify-center rounded">
                                                    Claimed By Owner
                                                </div>
                                            ) : (
                                                <div className="flex flex-1">
                                                    {iswithdaw ? (
                                                        <div className="text-center py-3 flex-1 bg-gray-500 items-center justify-center rounded">
                                                            Withdrawing...
                                                        </div>
                                                    ) : (
                                                        <button
                                                            className="text-center py-3 flex-1 bg-red-700 items-center justify-center  rounded"
                                                            onClick={withdraw}
                                                        >
                                                            Withdraw
                                                        </button>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="flex-1">
                                            <form onSubmit={fundTheCampaign}>
                                                <div className="flex items-center justify-center rounded">
                                                    <input
                                                        required
                                                        type="number"
                                                        className="flex-1 p-2 rounded bg-black"
                                                        placeholder="0.01 ETH"
                                                        value={amount}
                                                        onChange={(e) =>
                                                            setAmount(
                                                                Number(
                                                                    e.target
                                                                        .value
                                                                )
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="flex mt-2">
                                                    {isFunding ? (
                                                        <div className="text-center py-3 flex-1 bg-gray-500 items-center justify-center rounded">
                                                            Funding Campaign...
                                                        </div>
                                                    ) : (
                                                        <button
                                                            type="submit"
                                                            className="text-center py-3 flex-1 bg-[#0041c2] items-center justify-center rounded"
                                                        >
                                                            Fund Campaign
                                                        </button>
                                                    )}
                                                </div>
                                            </form>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <h1 className="text-xl py-3">
                                Connect your wallet to fund
                            </h1>
                        )}
                    </div>
                </div>
                <div className="mt-6">
                    <div>
                        <h4 className="text-xl text-gray-300">Creator</h4>
                        <span className="text-sm text-gray-400">
                            {campaign.creator}
                        </span>
                    </div>
                    <div className="mt-6">
                        <h4 className="text-xl text-gray-300">Description</h4>
                        <span className="text-sm text-gray-400">
                            {campaign.description}
                        </span>
                    </div>
                    {campaign.funders.length > 0 ? (
                        <div className="mt-6">
                            <h4 className="text-xl text-gray-300">Funders</h4>
                            <div className="text-sm text-gray-400">
                                {campaign.funders.map((funder: string) => (
                                    <div key={funder} className="py-1">
                                        {funder}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        );
    }
};

export default FetchCampaign;
