import { getServerSession } from "next-auth";
import { AuthOptions } from "@/lib/AuthOptions";
import { redirect } from "next/navigation";
import LoginForm from "@/components/LoginForm";

export default async function Login() {
    const session = await getServerSession(AuthOptions);
    if (session) {
        redirect("/");
    }

    return <LoginForm />;
}