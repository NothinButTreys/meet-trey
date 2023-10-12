import { Button } from "./ui/button";

export default function TechList() {
    const techUsed = [
        "React",
        "Next.js",
        "Tailwind CSS",
        "TypeScript",
        "MongoDB",
    ];

    return (
        <div className="bg-gray-800 rounded-xl my-3 w-full">
            <div className="max-w-7xl mx-auto p-4 flex flex-col gap-4">
                <h2 className="text-2xl font-bold tracking-tight text-emerald-600">
                    Developed using a modern tech stack that includes:
                </h2>
                <div className="flex flex-wrap gap-2">
                    {techUsed.map((tech, i) => {
                        return (
                            <Button
                                key={i + tech}
                                className="py-2 px-4 shadow-md no-underline rounded-full bg-blue text-emerald-600 font-sans font-semibold text-sm border-emerald-900 hover:border-emerald-700 border hover:text-emerald-400 hover:bg-blue-light focus:outline-none active:shadow-none mr-2 cursor-default"
                            >
                                {tech}
                            </Button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
