import connectMongoDB from "@/lib/mongodb";
import Project from "@/models/project";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export interface IProject {
    title: string;
    company: string;
    location: string;
    description: string;
    image: string;
    _id: string;
}

export async function POST(request: Request): Promise<Response> {
    const { title, company, location, description, image } =
        await request.json();
    await connectMongoDB();
    await Project.create({
        title,
        company,
        location,
        description,
        image,
    });
    return NextResponse.json(
        { message: "Project added successfully" },
        { status: 201 }
    );
}

export async function DELETE(
    request: any
): Promise<Response> {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Project.findByIdAndDelete(id);
    return NextResponse.json(
        { message: "Project deleted successfully" },
        { status: 200 }
    );
}
