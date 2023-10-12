import RegisterFrom from "@/components/RegisterForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { AuthOptions } from "@/lib/AuthOptions";

export default async function Register() {
    const session = await getServerSession(AuthOptions);
    if (session) {
        redirect("/");
    }

    return <RegisterFrom />;
}
