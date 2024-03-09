import mongoose, { Schema } from "mongoose";
const userSchema = new Schema({
    profile: { type: String },
    email: { type: String, unique: true, required: true },
    currentStatus: {
        type: String,
        enum: ["student", "working", "job seeking", "freelancing"],
    },
    interviews: [{ type: Schema.Types.ObjectId }],
    education: [{}],
    experience: [{}],
    place: { type: String },
    resumeLink: { type: String },
    role: { type: String, enum: ["user", "admin", "recruiter"], default: "user" },
    about: { type: String },
    portfolioLink: { type: String },
    skills: [{ type: String }],
    savedJobs: [{ type: Schema.Types.ObjectId }],
    messages: [{ type: Schema.Types.ObjectId }],
    applied: [
        {
            company: { type: String },
            id: { type: Schema.Types.ObjectId },
            location: { type: String },
            status: {
                type: String,
                enum: [
                    "applied",
                    "under review",
                    "shortlisted",
                    "selected",
                    "interview",
                ],
            },
            title: { type: String },
        },
    ],
    workingAt: { type: String },
    userName: { type: String, unique: true, required: true },
    contact: { type: Number, unique: true, required: true },
});
export const UserDataModel = mongoose.model("User", userSchema);
//# sourceMappingURL=userData.model.js.map