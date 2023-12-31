import LogoutButton from "@/components/LogoutButton";
import ProjectsList from "@/components/ProjectsList";
import TechList from "@/components/TechList";
import Navbar from "@/components/Navbar";
import { IsAuthed } from "@/components/IsAuthed";
import AddProjectSlideOut from "@/components/AddProjectSlideOut";
import ProfileSlideOut from "@/components/ProfileSlideOut";
import { defaultProfile } from '@/util/defaultProfile';
import connectMongoDB from "@/lib/mongodb";
import Profile from "@/models/profile";
import { IProfile } from './api/profile/route';

const getProfile = async () => {
    await connectMongoDB();
    const profile = (await Profile.findOne()) as IProfile;
    return profile;
};

export default async function Home() {
    const profile = await getProfile();

    return (
        <>
            <div className="w-full flex flex-col sm:flex-row flex-grow overflow-hidden relative">
                <div className="hidden lg:block md:w-1/3 lg:w-1/4 w-full flex-shrink flex-grow-0 p-4">
                    <Navbar />
                    <TechList />
                    <div className="flex flex-row gap-2 items-center">
                        <IsAuthed>
                            <AddProjectSlideOut />
                            <ProfileSlideOut />
                            <LogoutButton />
                        </IsAuthed>
                    </div>
                </div>
                <main
                    role="main"
                    className="w-full h-full flex-grow p-4 overflow-auto"
                >
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-4">
                            {profile && profile.image && (<div
                                className="w-full mb-4 lg:mb-0 max-h-80 overflow-hidden bg-cover bg-no-repeat h-80 lg:bg-[center_center_-5rem] xl:bg-[center_-10rem]"
                                style={{
                                    backgroundImage: `url(${profile.image})`,
                                }}
                            ></div>)}
                            <h1
                                className="px-4 lg:p-0 text-3xl md:text-5xl font-extrabold"
                                id="home"
                            >
                                {(profile && profile.title) ||
                                    defaultProfile.title}
                            </h1>
                            <h2 className="px-4 lg:p-0 text-xl md:text-3xl font-bold">
                                {(profile && profile.subTitle) ||
                                    defaultProfile.subTitle}
                            </h2>
                            <div className="px-4 lg:p-0 w-full">
                                <p className="text-lg">
                                    {(profile && profile.description) ||
                                        defaultProfile.description}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-20 px-4 lg:p-0">
                        <ProjectsList />
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
