import { Schema, model, models } from "mongoose";

const profileSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        subTitle: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        imageAlt: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Profile = models.Profile || model("Profile", profileSchema);

export default Profile;
