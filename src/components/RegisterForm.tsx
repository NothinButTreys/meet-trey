"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, buttonVariants } from "./ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useToast } from "./ui/use-toast";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function RegisterFrom() {
    const { toast } = useToast();
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const resUserExists = await fetch("/api/userExists", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: formData.email,
            }),
        });

        const { user } = await resUserExists.json();

        if (user) {
            toast({
                title: "User already exists",
                duration: 2000,
            });
        }

        const res = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: formData.name,
                email: formData.email,
                password: formData.password,
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
            router.push("/");
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
        <div className="h-screen justify-start md:justify-center items-center align-middle flex flex-col translate-y-0 md:translate-y-[-15%]">
            <Card className="max-w-[80%] md:max-w-md w-full shadow-[0_15px_80px_-5px_rgba(#064e3b.3)] shadow-emerald-900 border-emerald-900">
                <CardHeader>
                    <CardTitle>Register</CardTitle>
                </CardHeader>
                <CardContent>
                    <form
                        className="flex flex-col gap-4"
                        onSubmit={handleSubmit}
                    >
                        <div className="fex flex-col gap-2 w-full">
                            <label htmlFor="name" className="flex">
                                Name
                            </label>
                            <input
                                className="border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500 rounded-sm px-2 py-1 text-gray-800 w-full"
                                type="name"
                                name="name"
                                id="name"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="fex flex-col gap-2 w-full">
                            <label htmlFor="email" className="flex">
                                Email
                            </label>
                            <input
                                className="border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500 rounded-sm px-2 py-1 text-gray-800 w-full"
                                type="email"
                                name="email"
                                id="email"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="fex flex-col gap-2 w-full">
                            <label htmlFor="password" className="flex">
                                Password
                            </label>
                            <input
                                className="border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500 rounded-sm px-2 py-1 text-gray-800 w-full"
                                type="password"
                                name="password"
                                id="password"
                                onChange={handleChange}
                            />
                        </div>
                    </form>
                </CardContent>
                <CardFooter>
                    <Button className="rounded bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-2 px-4">
                        Register
                    </Button>
                </CardFooter>
            </Card>
            <div className="flex flex-row gap-2 justify-start items-center">
                <div className="">already have an account?</div>
                <Link
                    href="/login"
                    className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "p-0 hover:bg-transparent hover:underline"
                    )}
                >
                    Login
                </Link>
            </div>
        </div>
    );
}
