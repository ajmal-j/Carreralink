import mongoose, { Schema, Document, ObjectId } from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

export interface IUserData extends Document {
  _id: ObjectId;
  profile: string;
  email: string;
  currentStatus: string | null;
  isBlocked: boolean;
  interviews: String | null;
  education: {
    institution: string;
    degree: string;
    startDate: Date | string;
    endDate: Date | string;
  }[];
  experience: {
    companyName: string;
    position: string;
    startDate: Date | string;
    endDate: Date | string;
  }[];
  place: string | null;
  resumeLink: string | null;
  role: "user" | "recruiter";
  isAdmin: boolean;
  about: string | null;
  portfolioLink: string | null;
  skills: string[] | null;
  savedJobs: String | null;
  messages: String | null;
  applied: {
    company: String | null;
    id: ObjectId | null;
    location: string | null;
    status: string | null;
    title: string | null;
  }[];
  workingAt: string | null;
  username: string;
  contact: number;
}

const userSchema: Schema = new Schema(
  {
    profile: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    email: { type: String, unique: true, required: true },
    currentStatus: {
      type: String,
      enum: ["student", "working", "job seeking", "freelancing"],
    },
    interviews: [{ type: Schema.Types.ObjectId, ref: "interviews" }],
    education: [
      {
        institution: { type: String },
        degree: { type: String },
        startDate: { type: String },
        endDate: { type: String },
      },
    ],
    experience: [
      {
        companyName: { type: String },
        position: { type: String },
        startDate: { type: String },
        endDate: { type: String },
      },
    ],
    place: { type: String },
    resumeLink: { type: String },
    isAdmin: { type: Boolean, default: false },
    role: { type: String, enum: ["user", "recruiter"], default: "user" },
    about: { type: String },
    portfolioLink: { type: String },
    skills: [{ type: String }],
    savedJobs: [{ type: String }],
    isBlocked: { type: Boolean, default: false },
    messages: [{ type: Schema.Types.ObjectId, ref: "messages" }],
    applied: [
      {
        company: { type: String },
        jobId: { type: String },
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
      },
    ],
    workingAt: { type: String },
    username: { type: String, unique: true, required: true },
    contact: { type: Number, unique: true, required: true },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(aggregatePaginate);

userSchema.index(
  { username: "text", email: "text" },
  { default_language: "english" }
);

export const UserDataModel = mongoose.model<IUserData>("User", userSchema);

export type UserDataModelType = typeof UserDataModel & {
  aggregatePaginate?: any;
};
