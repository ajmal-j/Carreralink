import mongoose, { Schema, Document, ObjectId } from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

export interface IJobs extends Document {
  id: string;
  title: string;
  company: ObjectId;
  applicants: ObjectId[];
  type: string;
  category: string;
  officeLocation: string | null;
  workSpace: string;
  openings: string;
  status: string;
  isPaused: boolean;
  description: string;
  skills: string[];
  pay: {
    maximum: string;
    minimum: string;
    rate: string;
  };
}

const jobsSchema: Schema = new Schema(
  {
    title: { type: String },
    applicants: [{ type: Schema.Types.ObjectId, ref: "Applicant" }],
    company: { type: Schema.Types.ObjectId, ref: "Company" },
    type: { type: String },
    category: { type: String },
    officeLocation: { type: String },
    workSpace: { type: String },
    openings: { type: String },
    status: { type: String, enum: ["closed", "open"], default: "open" },
    isPaused: { type: Boolean },
    description: { type: String },
    skills: [{ type: String }],
    pay: {
      maximum: { type: String },
      minimum: { type: String },
      rate: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

jobsSchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

jobsSchema.plugin(aggregatePaginate);

jobsSchema.index(
  { title: "text", category: "text" },
  { default_language: "english" }
);

export const JobsModel = mongoose.model<IJobs>("Jobs", jobsSchema);

export type JobsModelType = typeof JobsModel & {
  aggregatePaginate?: any;
};
