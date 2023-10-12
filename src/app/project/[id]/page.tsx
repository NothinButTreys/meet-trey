import Navbar from "@/components/Navbar";
import TechList from "@/components/TechList";
import { Skeleton } from "@/components/ui/skeleton";
import connectMongoDB from "@/lib/mongodb";
import Image from "next/image";
import Project from "@/models/project";
import { IProject } from "@/app/api/project/route";

const getProjectById = async (id: string) => {
    await connectMongoDB();
    const project = await Project.findOne({ _id:id }) as IProject;
    return project;
}

export default async function ProjectPage({ params }: { params: { id: string } }) {
    const { id } = params;
    const project = await getProjectById(id);

    if(!project) {
        return (
            <div className="flex flex-col gap-4">
                <Skeleton className="w-full h-4" />
            </div>
        );
    }

    return (
        <>
            <div className="w-full flex flex-col sm:flex-row flex-grow overflow-hidden relative">
                <div className="sm:w-1/3 md:1/4 w-full flex-shrink flex-grow-0 p-4">
                    <Navbar />
                    <TechList />
                </div>
                <main
                    role="main"
                    className="w-full h-full flex-grow p-3 overflow-auto"
                >
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-4">
                            <div className="w-full max-h-96 overflow-hidden">
                                {project.image && project.image !== "" && (
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        width="1400"
                                        height="400"
                                    />
                                )}
                            </div>
                            <div className="flex flex-row justify-between gap-4 items-center">
                                <h1 className="text-3xl font-extrabold">
                                    {project.title}
                                </h1>
                                <div className="flex flex-row gap-4">
                                    <span>{project.company}</span>
                                    <span>{project.location}</span>
                                </div>
                            </div>
                            <div className="w-full">{project.description}</div>
                        </div>
                    </div>
                </main>
            </div>
            <footer className="w-full">
                <div className="px-4 py-3 text-white ">
                    <div className="text-right text-xs py-2">
                        &copy; 2023 by Trey McBride
                    </div>
                </div>
            </footer>
        </>
    );
}
