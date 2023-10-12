"use client";

import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import { useState } from "react";
import { LoadingIndicator } from "./ui/loading-indicator";
import { AiOutlineLoading } from "react-icons/ai";

export default function RemoveProject({ id }: { id: string }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const removeProject = async () => {
        setLoading(true);
        const res = await fetch(`/api/project?id=${id}`, {
            method: "DELETE",
            cache: "no-cache",
        });

        if (!res.ok) {
            throw new Error("failed to delete project");
        }

        if (res.ok) {
            router.refresh();
            setLoading(false);
            toast({
                title: "Project removed successfully",
                duration: 2000,
            });
        }
    };

    return (
        <Button
            className="text-red-600 hover:text-red-400 hover:bg-transparent bg-transparent px-1"
            onClick={removeProject}
        >
            {loading ? (
                <span className="animate-spin w-4 h-4">
                    <AiOutlineLoading size="18" className="text-emerald-700" />
                </span>
            ) : (
                <HiOutlineTrash size="18" />
            )}
        </Button>
    );
}
