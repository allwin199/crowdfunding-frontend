"use client";

import { useState } from "react";
import { useContract, useContractRead, useAddress } from "@thirdweb-dev/react";
import { ethers } from "ethers";

type FetchCampaignPropTypes = {
    id: string;
};

const FetchCampaign = ({ id }: FetchCampaignPropTypes) => {
    const [amount, setAmount] = useState(0);
    const [isFunding, setIsFunding] = useState(false);
    const { contract } = useContract(
        "0xb3Ee0a7A4DB0aC498eeE1510708D06C73d8c42f0"
    );
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
            setAmount(0);
            refetch();
            console.log(campaign);
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

    const daysLeft = (deadline: number) => {
        const difference = new Date(deadline).getTime() - Date.now();
        const remainingDays = difference / (1000 * 3600 * 24);

        return Number(Math.abs(+remainingDays).toFixed(0));
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
                        {daysLeft(Number(campaign.endAt)) > 1 ? (
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
                                {daysLeft(Number(campaign.endAt)) > 1 ? (
                                    <div className="flex items-center justify-center bg-[#0041c2] rounded">
                                        {campaign.creator === address ? (
                                            <button className="text-center py-3">
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
                                            <div className="flex items-center justify-center bg-[#0041c2] rounded mt-2">
                                                <button
                                                    type="submit"
                                                    className="text-center py-3"
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
