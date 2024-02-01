import React from "react";

type Props = {
    params: { id: string };
};

const page = (params: Props) => {
    console.log(params.params.id);
    console.log("Params", params);
    return (
        <main className="container mx-auto pt-28">
            <h1>Campaign Details for Id {params.params.id}</h1>
        </main>
    );
};

export default page;
