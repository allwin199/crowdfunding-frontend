"use client";

import Link from "next/link";
import { ConnectWallet } from "@thirdweb-dev/react";

export default function Header() {
    return (
        <header>
            <nav className="fixed w-full z-50 bg-[#13131a] border-b border-[#3b3b3b]">
                <div className="flex justify-end items-center p-4 px-10 text-sm">
                    <Link href="/campaigns" className="px-4 py-2">
                        Campaigns
                    </Link>
                    <Link href="/create-campaign" className="pl-4 py-2 pr-8">
                        Create Campaign
                    </Link>
                    <ConnectWallet
                        className="my-custom-button"
                        btnTitle="Connect"
                    />
                </div>
            </nav>
        </header>
    );
}
