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
        }
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
    };

    const withdraw = async () => {
        try {
            const data = await contract?.call("withdraw", [id]);
            console.info("contract call successs", data);
            refetch();
        } catch (err) {
            console.error("contract call failure", err);
        } finally {
            setIsFunding(false);
        }
    };

    if (isLoading) {
        return (
            <div className="mt-10">
                <h1>Campaign Loading ...</h1>
            </div>
        );
    }

    if (isFunding) {
        return (
            <div className="mt-10">
                <h1>Funding the Campaign ...</h1>
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
                        <div className="bg-[#222222] rounded p-4">
                            Amount Collected
                            <p className="text-sm mt-4">
                                {ethers.utils.formatEther(
                                    campaign.amountCollected.toString()
                                )}{" "}
                                ETH
                            </p>
                        </div>
                        <div className="bg-[#222222] rounded p-4">
                            Total Funders
                            <p className="text-sm mt-4">
                                {campaign.funders.length}
                            </p>
                        </div>

                        {address ? (
                            <div className="col-span-2">
                                {daysLeft(Number(campaign.endAt)) < 0 ? (
                                    <div className="flex">
                                        {campaign.creator === address ? (
                                            <button
                                                className="text-center py-3 flex-1 bg-[#0041c2] items-center justify-center  rounded"
                                                onClick={withdraw}
                                            >
                                                Withdraw
                                            </button>
                                        ) : (
                                            <h1 className="py-3 text-gray-500">
                                                Campaign Ended
                                            </h1>
                                        )}
                                    </div>
                                ) : (
                                    <div>
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
                                                                e.target.value
                                                            )
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className="flex mt-2">
                                                <button
                                                    type="submit"
                                                    className="text-center py-3 flex-1 bg-[#0041c2] items-center justify-center rounded"
                                                >
                                                    Fund Campaign
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                )}
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
