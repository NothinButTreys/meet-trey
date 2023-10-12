import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import AddProjectForm from "./AddProjectForm";
import { BsPlusSquare } from "react-icons/bs";

export default function AddProjectSlideOut() {
    return (
        <Sheet>
            <SheetTrigger>
                <BsPlusSquare className="text-emerald-800 hover:text-current" size={40} />
            </SheetTrigger>
            <SheetContent className="gap-4 flex flex-col">
                <SheetHeader>
                    <SheetTitle>Add Project</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col w-full h-full">
                    <AddProjectForm />
                </div>
            </SheetContent>
        </Sheet>
    );
}