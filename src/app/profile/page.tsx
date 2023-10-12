"use client";

import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import { AiOutlineLoading } from "react-icons/ai";

type IProfileForm = {
    setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ProfileForm({ setOpen }: IProfileForm) {
    const { toast } = useToast();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        subTitle: "",
        description: "",
        image: "",
        imageAlt: "",
    });

    const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.onload = () => {
                setFormData({
                    ...formData,
                    image: reader.result as string,
                });
            };
            reader.onerror = (error) => {
                console.log("Error: ", error);
            };
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const res = await fetch("/api/profile", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: formData.title,
                subTitle: formData.subTitle,
                description: formData.description,
                image: formData.image,
                imageAlt: formData.imageAlt,
            }),
        });

        if (!res.ok) {
            const { message } = await res.json();
            toast({
                title: message,
                duration: 10000,
            });
            return;
        }

        if (res.ok) {
            router.refresh();
            setOpen(false);
            setLoading(false);
            toast({
                title: "Profile Updated Successfully",
                duration: 2000,
            });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <>
            {loading ? (
                <span className="animate-spin w-4 h-4">
                    <AiOutlineLoading size="18" className="text-emerald-700" />
                </span>
            ) : (
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="fex flex-col gap-2 w-full">
                        <label htmlFor="title" className="flex">
                            Title
                        </label>
                        <input
                            className="border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500 rounded-sm px-2 py-1 text-gray-800 w-full"
                            type="title"
                            name="title"
                            id="title"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="fex flex-col gap-2 w-full">
                        <label htmlFor="subTitle" className="flex">
                            Sub Title Text
                        </label>
                        <input
                            className="border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500 rounded-sm px-2 py-1 text-gray-800 w-full"
                            type="subTitle"
                            name="subTitle"
                            id="subTitle"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="fex flex-col gap-2 w-full">
                        <label htmlFor="description" className="flex">
                            Description
                        </label>
                        <input
                            className="border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500 rounded-sm px-2 py-1 text-gray-800 w-full"
                            type="description"
                            name="description"
                            id="description"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="fex flex-col gap-2 w-full">
                        <label htmlFor="image" className="flex">
                            Image
                        </label>
                        {formData && formData.image && (
                            <Image
                                src={formData.image}
                                alt={formData.title}
                                width="335"
                                height="223"
                            />
                        )}
                        <input
                            type="file"
                            name="image"
                            id="image"
                            onChange={onImageChange}
                        />
                    </div>
                    <div className="fex flex-col gap-2 w-full">
                        <label htmlFor="imageAlt" className="flex">
                            Image Alt Info
                        </label>
                        <input
                            className="border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500 rounded-sm px-2 py-1 text-gray-800 w-full"
                            type="imageAlt"
                            name="imageAlt"
                            id="imageAlt"
                            onChange={handleChange}
                        />
                    </div>

                    <Button
                        className="bg-emerald-800 hover:bg-emerald-700 text-white px-2 py-1 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        type="submit"
                        disabled={
                            !formData.title &&
                            !formData.subTitle &&
                            !formData.description &&
                            !formData.image &&
                            !formData.imageAlt
                        }
                    >
                        Add Profile
                    </Button>
                </form>
            )}
        </>
    );
}
