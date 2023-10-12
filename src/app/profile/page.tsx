"use client";

import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import { AiOutlineLoading } from "react-icons/ai";

export default function Profile({
    children
}: {
    children: React.ReactNode;
}) {

    return (
        <div className="flex flex-col w-full h-full">
            {children}
        </div>
    );
}
