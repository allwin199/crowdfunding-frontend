"use client";
import { ConnectWallet, embeddedWallet } from "@thirdweb-dev/react";

const page = () => {
    return (
        <div>
            <ConnectWallet theme="dark" />
        </div>
    );
};

export default page;
