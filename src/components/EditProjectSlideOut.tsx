import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import EditProjectForm from "./EditProjectForm";
import { Project } from "./ProjectsList";
import { HiPencilAlt } from "react-icons/hi";
import { Button } from "./ui/button";
import { Separator } from "@/components/ui/separator";

export default function EditProjectSlideOut({
    title,
    company,
    location,
    description,
    image,
    _id,
}: Project) {
    return (
        <Sheet>
            <SheetTrigger>
                <Button className="text-red-600 hover:text-red-400 hover:bg-transparent bg-transparent px-1">
                    <HiPencilAlt className="text-gray-100 hover:text-gray-300" />
                </Button>
            </SheetTrigger>
            <SheetContent className="gap-4 flex flex-col">
                <SheetHeader>
                    <SheetTitle>Edit Your Project</SheetTitle>
                </SheetHeader>
                <Separator />
                <div className="flex flex-col w-full h-full">
                    <EditProjectForm
                        title={title}
                        company={company}
                        location={location}
                        description={description}
                        image={image}
                        _id={_id}
                    />
                </div>
            </SheetContent>
        </Sheet>
    );
}
