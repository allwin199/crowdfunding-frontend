import FetchCampaign from "@/components/campaigns/FetchCampaign";

type Props = {
    params: { id: string };
};

const page = (params: Props) => {
    return (
        <main className="container mx-auto pt-28">
            <FetchCampaign id={params.params.id} />
        </main>
    );
};

export default page;
