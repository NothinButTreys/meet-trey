import Link from "next/link";
import RemoveProject from "./RemoveProject";
import Image from "next/image";
import { IsAuthed } from "./IsAuthed";
import EditProjectSlideOut from "./EditProjectSlideOut";
import { Separator } from "@/components/ui/separator";

export interface Project {
    title: string;
    company: string;
    location: string;
    description: string;
    image: string;
    _id: string;
}

const getProjects = async () => {
    const res = await fetch(`${process.env.BASE_URL}/api/project`, {
        cache: "no-cache",
    });

    if (!res.ok) {
        throw new Error("failed to fetch projects");
    }

    const projects = await res.json();
    return projects;
};

export default async function ProjectsList() {
    const { projects } = await getProjects();

    return (
        <div className="flex flex-col gap-20">
            {projects.map((project: Project) => (
                <div
                    key={project._id}
                    className="w-full flex flex-col md:flex-row gap-4"
                >
                    {project.image && project.image !== "" && (
                        <Image
                            src={project.image}
                            alt={project.title}
                            width="500"
                            height="500"
                            className="w-full sm:max-w-sm hidden md:block"
                        />
                    )}
                    <div className="flex flex-col gap-4 w-full">
                        <div className="flex flex-col">
                            <div className="flex flex-row gap-4 justify-between items-center">
                                <span className="text-gray-300 text-2xl">
                                    {project.title}
                                </span>
                                <IsAuthed>
                                    <div className="flex flex-row gap-4">
                                        <EditProjectSlideOut {...project} />
                                        <RemoveProject id={project._id} />
                                    </div>
                                </IsAuthed>
                            </div>
                            <div className="flex flex-row gap-4 text-gray-400 italic text-sm">
                                {project.company} {project.location}
                            </div>
                        </div>
                        <Separator className="border-slate-200/[.6]" />
                        <div className="text-gray-300">
                            {project.image && project.image !== "" && (
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    width="200"
                                    height="300"
                                    className="md:hidden float-left w-full mr-0 mb-2 sm:mb-0 sm:mr-4 xs:w-[200px]"
                                />
                            )}
                            {project.description}
                        </div>
                        <Link
                            href={`project/${project._id}`}
                            className="text-emerald-800 hover:text-emerald-700"
                        >
                            Read More
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}
