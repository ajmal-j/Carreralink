import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IUserData extends Document {
  _id: ObjectId;
  profile: string | null;
  email: string;
  currentStatus: string | null;
  interviews: ObjectId[] | null;
  education: {}[];
  experience: {}[];
  place: string | null;
  resumeLink: string | null;
  role: "user" | "admin" | "recruiter";
  about: string | null;
  portfolioLink: string | null;
  skills: string[] | null;
  savedJobs: ObjectId[] | null;
  messages: ObjectId[] | null;
  applied: {
    company: ObjectId | null;
    id: ObjectId | null;
    location: string | null;
    status: string | null;
    title: string | null;
  }[];
  workingAt: string | null;
  userName: string;
  contact: number;
}

const userSchema: Schema = new Schema({
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

export const UserDataModel = mongoose.model<IUserData>("User", userSchema);

export type UserDataModelType = typeof UserDataModel;
