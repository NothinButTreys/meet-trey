import { NextResponse } from "next/server";
import Profile from "@/models/profile";
import connectMongoDB from "@/lib/mongodb";

interface Profile {
    title: string;
    subTitle: string;
    description: string;
    image: string;
    imageAlt: string;
}

export async function POST(req: Request): Promise<Response> {
    const { title, subTitle, description, image, imageAlt } = await req.json();
    if (!title || !subTitle || !description || !image || !imageAlt) {
        return NextResponse.json(
            {
                message: "Please fill all fields",
            },
            { status: 400 }
        );
    }

    await connectMongoDB();
    await Profile.deleteMany({});
    await Profile.create({
        title,
        subTitle,
        description,
        image,
        imageAlt
    });

    return NextResponse.json(
        {
            message: "Profile added successfully",
        },
        { status: 200 }
    );
}

export async function GET() {
    await connectMongoDB();
    const profile = await Profile.findOne();
    return NextResponse.json({ profile });
}