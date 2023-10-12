"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, buttonVariants } from "./ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Login() {
    const router = useRouter();
    const { toast } = useToast();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const res = (await signIn("credentials", {
            redirect: false,
            email: formData.email,
            password: formData.password,
        })) as {
            error?: string;
            ok?: boolean;
        };

        if (res.error) {
            toast({
                title: res.error,
                duration: 2000,
            });
            return;
        }

        if (res.ok) {
            setFormData({
                ...formData
            });
            router.replace("/");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="flex-col h-screen justify-center items-center align-middle flex translate-y-0 md:translate-y-[-15%]">
            <Card className="max-w-[80%] md:max-w-md w-full shadow-[0_15px_80px_-5px_rgba(#064e3b.3)] shadow-emerald-900 border-emerald-900">
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="flex flex-col gap-4">
                        <div className="fex flex-col gap-2 w-full">
                            <label htmlFor="email" className="flex">
                                Email
                            </label>
                            <input
                                className="border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500 rounded-sm px-2 py-1 text-gray-800 w-full"
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email"
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
                                placeholder="Password"
                                onChange={handleChange}
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button
                            type="submit"
                            className="rounded bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-2 px-4"
                        >
                            Login
                        </Button>
                    </CardFooter>
                </form>
            </Card>
            <div className="flex flex-row gap-2 justify-start items-center">
                Don&apos;t have an account?
                <Link
                    href="/login"
                    className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "p-0 hover:bg-transparent hover:underline"
                    )}
                >
                    Register
                </Link>
            </div>
        </div>
    );
}
