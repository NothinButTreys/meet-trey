import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Email" },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "Password",
                },
            },

            async authorize(credentials) {
                const { email, password } = credentials as {
                    email: string;
                    password: string;
                };

                await connectMongoDB();
                const user = await User.findOne({ email }).select("password");

                if (!user) {
                    throw new Error("No user found");
                }

                const isValid = await bcrypt.compare(password, user.password);

                if (!isValid) {
                    throw new Error("Invalid password");
                }

                return user;
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login",
        signOut: "/logout",
        error: "/login",
    },
};
