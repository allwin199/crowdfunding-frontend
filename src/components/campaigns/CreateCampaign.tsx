"use client";

import React, { useState } from "react";
import FormField from "../FormField";
import FormTextArea from "../FormTextArea";

type formFields = {
    name: string;
    description: string;
    targetAmount: string;
    endAt: string;
    image: string;
};

const initialFormState = {
    name: "",
    description: "",
    targetAmount: "",
    endAt: "",
    image: "",
};

const CreateCampaign = () => {
    const [form, setForm] = useState<formFields>(initialFormState);

    const handleFormFieldChange = (
        fieldName: keyof formFields,
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [fieldName]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(form.name);
        setForm(initialFormState);
    };

    return (
        <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
            <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
                <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
                    Create Campaign
                </h1>
            </div>
            <form
                onSubmit={handleSubmit}
                className="w-full mt-[65px] flex flex-col gap-[30px]"
            >
                <div className="flex flex-wrap gap-[40px]">
                    <FormField
                        labelName="Campaign Name *"
                        placeholder="Campaign 1"
                        inputType="text"
                        value={form.name}
                        handleChange={(e) => handleFormFieldChange("name", e)}
                    />
                </div>

                <FormTextArea
                    labelName="Description *"
                    placeholder="Campaign Description"
                    value={form.description}
                    handleChange={(e) =>
                        handleFormFieldChange("description", e)
                    }
                />

                <div className="flex flex-wrap gap-[40px]">
                    <FormField
                        labelName="Goal *"
                        placeholder="ETH 0.50"
                        inputType="number"
                        value={form.targetAmount}
                        handleChange={(e) =>
                            handleFormFieldChange("targetAmount", e)
                        }
                    />
                    <FormField
                        labelName="End Date *"
                        placeholder="End Date"
                        inputType="date"
                        value={form.endAt}
                        handleChange={(e) => handleFormFieldChange("endAt", e)}
                    />
                </div>

                <FormField
                    labelName="Campaign image *"
                    placeholder="Place image URL of your campaign"
                    inputType="url"
                    value={form.image}
                    handleChange={(e) => handleFormFieldChange("image", e)}
                />

                <div className="flex justify-center items-center mt-[40px]">
                    <button
                        type="submit"
                        className="bg-[#0041c2] px-16 rounded py-2"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateCampaign;
