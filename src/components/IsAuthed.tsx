"use client";

import { useSession } from "next-auth/react";

export function IsAuthed({
    children
}: {
    children: React.ReactNode;
}) {
    const { status } = useSession();

    if (status === "authenticated") {
        return <>{children}</>;
    }

    return null;
}