import Link from "next/link";
import { ResumeLink } from "./ResumeLink";
import Project from "@/models/project";
import connectMongoDB from "@/lib/mongodb";

export interface Project {
    title: string;
    _id: string;
}

const getProjects = async () => {
    await connectMongoDB();
    const projects: Project[] = await Project.find();
    return projects;
};

export default async function Navbar() {
    const projects = await getProjects();

    return (
        <div className="sticky top-0 py-4 px-2 bg-gray-800 rounded-xl w-full">
            <ul className="flex sm:flex-col overflow-hidden content-center justify-between">
                <li className="hover:bg-emerald-800 rounded">
                    <Link
                        className="truncate flex flex-row items-center p-2"
                        href="/"
                    >
                        <span className="hidden sm:inline">Home</span>
                    </Link>
                </li>

                <li className="hover:bg-emerald-800 rounded">
                    <ResumeLink />
                </li>

                <hr className="border-slate-200/[.2]  my-4" />

                {projects.length > 0 && (
                    <>
                        <li className="rounded px-2">
                            <span className="hidden sm:inline">
                                My Projects
                            </span>
                        </li>
                    </>
                )}

                {projects.length > 0 &&
                    projects.map((project: Project) => (
                        <li
                            key={project._id}
                            className="hover:bg-emerald-800 p-2 rounded"
                        >
                            <Link
                                className="truncate flex flex-row items-center"
                                href={`/project/${project._id}`}
                            >
                                <span className="sm:pr-2 pr-4 box-content">
                                    - {project.title}
                                </span>
                            </Link>
                        </li>
                    ))}
            </ul>
        </div>
    );
}
