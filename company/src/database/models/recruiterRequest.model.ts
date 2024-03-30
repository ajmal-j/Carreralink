import mongoose, { Schema } from "mongoose";

export interface IRecruiterRequest {
  user: string;
  name: string;
  company: string;
  message: string;
  status: "pending" | "accepted" | "rejected";
}

const recruiterRequestSchema = new Schema<IRecruiterRequest>({
  user: { type: String },
  name: { type: String },
  message: { type: String },
  company: { type: String },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "accepted", "rejected"],
  },
});

export const RecruiterRequestModel = mongoose.model<IRecruiterRequest>(
  "RecruiterRequest",
  recruiterRequestSchema
);
export type IRecruiterRequestModel = typeof RecruiterRequestModel;
