'use client';

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

export default function LogoutButton() {

    return (
        <Button
            className="bg-emerald-800 rounded-sm py-2 px-4"
            onClick={() => signOut()}
        >
            Logout
        </Button>
    );
}
