import connectMongoDB from "@/lib/mongodb";
import Project from "@/models/project";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

interface Project {
    title: string;
    company: string;
    location: string;
    description: string;
    image: string;
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

export async function GET() {
    await connectMongoDB();
    const projects: Project[] = await Project.find();
    return NextResponse.json({ projects });
}

export async function DELETE(
    request: NextApiRequest & { nextUrl: URL }
) {
    if (request.nextUrl) {
        const id = request.nextUrl.searchParams.get("id");
        await connectMongoDB();
        await Project.findByIdAndDelete(id);
        return NextResponse.json(
            { message: "Project deleted successfully" },
            { status: 200 }
        );
    }
}
