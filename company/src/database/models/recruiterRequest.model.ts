import mongoose, { ObjectId, Schema } from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

export interface IRecruiterRequest {
  user: ObjectId;
  company: ObjectId;
  message: string;
  status: "pending" | "accepted" | "rejected";
}

const recruiterRequestSchema = new Schema<IRecruiterRequest>({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  message: { type: String },
  company: { type: Schema.Types.ObjectId, ref: "Company" },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "accepted", "rejected"],
  },
});

recruiterRequestSchema.plugin(aggregatePaginate);

recruiterRequestSchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

export const RecruiterRequestModel = mongoose.model<IRecruiterRequest>(
  "RecruiterRequest",
  recruiterRequestSchema
);

export type IRecruiterRequestModel = typeof RecruiterRequestModel & {
  aggregatePaginate: any;
};
