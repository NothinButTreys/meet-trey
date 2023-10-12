import { NextResponse } from "next/server";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import connectMongoDB from "@/lib/mongodb";

export async function POST(req: Request): Promise<Response> {
    const { name, email, password } = await req.json();
    if (!name || !email || !password) {
        return NextResponse.json(
            {
                message: "Please fill all fields",
            },
            { status: 400 }
        );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await connectMongoDB();

    await User.create({
        name,
        email,
        password: hashedPassword,
    });

    return NextResponse.json(
        {
            message: "User registered successfully",
        },
        { status: 200 }
    );
}
