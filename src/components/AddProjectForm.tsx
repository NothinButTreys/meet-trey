"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "./ui/use-toast";

export default function AddProjectForm() {
    const router = useRouter();
    const { toast } = useToast();
    const [formData, setFormData] = useState({
        title: "",
        company: "",
        location: "",
        description: "",
        image: "",
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

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const res = await fetch("/api/project", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (!res.ok) {
            throw new Error("failed to add project");
        }

        if (res.ok) {
            // reset form state
            setFormData({
                title: "",
                company: "",
                location: "",
                description: "",
                image: "",
            });
            toast({
                title: "Project added successfully",
                duration: 2000,
            });
            router.refresh();
        }
        // reset image
        const image = document.getElementById("image") as HTMLInputElement;
        image.value = "";
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
            <input
                className="border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500 rounded-sm px-2 py-1 text-gray-800 "
                type="text"
                placeholder="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
            />
            <input
                className="border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500 rounded-sm px-2 py-1 text-gray-800 "
                type="text"
                placeholder="Company Name"
                name="company"
                value={formData.company}
                onChange={handleChange}
            />
            <input
                className="border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500 rounded-sm px-2 py-1 text-gray-800 "
                type="text"
                placeholder="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
            />
            <input
                className="border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500 rounded-sm px-2 py-1 text-gray-800 "
                type="text"
                placeholder="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
            />
            <Button
                className="bg-emerald-800 hover:bg-emerald-700 text-white px-2 py-1 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
                disabled={
                    !formData.image ||
                    !formData.company ||
                    !formData.location ||
                    !formData.description ||
                    !formData.title
                }
            >
                Add Project
            </Button>
        </form>
    );
}
