import connectMongoDB from "@/lib/mongodb";
import Project from "@/models/project";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = params;
    const { title, company, location, description, image } =
        await request.json();
    await connectMongoDB();
    await Project.findByIdAndUpdate(id, {
        title,
        company,
        location,
        description,
        image,
    });

    return NextResponse.json(
        {
            message: "Project updated successfully",
        },
        { status: 200 }
    );
}