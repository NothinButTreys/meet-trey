'use client'

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { CgProfile } from "react-icons/cg";
import { useState } from "react";
import Profile from "@/app/profile/page";
import ProfileForm from "./ProfileForm";

export default function ProfileSlideOut() {
    const [open, setOpen] = useState<boolean>(false);
    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="flex">
                <CgProfile
                    className="text-emerald-800 hover:text-current"
                    size={50}
                />
            </SheetTrigger>
            <SheetContent className="gap-4 flex flex-col">
                <SheetHeader>
                    <SheetTitle>Add Profile</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col w-full h-full">
                    <Profile>
                        <ProfileForm setOpen={setOpen} />
                    </Profile>
                </div>
            </SheetContent>
        </Sheet>
    );
}