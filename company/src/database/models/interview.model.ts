import mongoose, { Document, ObjectId, Schema } from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";
export interface IInterview extends Document {
  applicant: ObjectId;
  job: ObjectId;
  startDate: Date;
  agenda: string;
  interviewer: ObjectId;
  time: string;
  status: "scheduled" | "cancelled" | "completed";
}

const interviewSchema: Schema<IInterview> = new Schema<IInterview>(
  {
    applicant: { type: Schema.Types.ObjectId, ref: "User" },
    job: { type: Schema.Types.ObjectId, ref: "Jobs" },
    startDate: { type: Date },
    time: { type: String },
    status: {
      type: String,
      enum: ["scheduled", "cancelled", "completed"],
      default: "scheduled",
    },
    agenda: { type: String },
    interviewer: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

interviewSchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret.__v;
    return ret;
  },
});

interviewSchema.plugin(aggregatePaginate);

export const InterviewModel = mongoose.model<IInterview>(
  "Interview",
  interviewSchema
);

export type InterviewModelType = typeof InterviewModel & {
  aggregatePaginate?: any;
};
