import mongoose, { Schema, Document, ObjectId } from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

export interface IJobs extends Document {
  id: string;
  title: string;
  company: ObjectId;
  applicants: number;
  type: string;
  category: string;
  officeLocation: string | null;
  workSpace: string;
  openings: string;
  status: string;
  description: string;
  skills: string[];
  assessments: [] | IAssessment[];
  pay: {
    maximum: string;
    minimum: string;
    rate: string;
  };
  postedBy: {
    by: "recruiter" | "company";
    ref: "User" | "Company";
    id: ObjectId;
  };
}

export interface IAssessment {
  no: number;
  question: string;
  expectedAnswer?: string;
}

const jobsSchema: Schema = new Schema<IJobs>(
  {
    title: { type: String },
    applicants: { type: Number, default: 0 },
    company: { type: Schema.Types.ObjectId, ref: "Company" },
    type: { type: String },
    category: { type: String },
    officeLocation: { type: String },
    workSpace: { type: String },
    openings: { type: String },
    status: { type: String, enum: ["closed", "open"], default: "open" },
    description: { type: String },
    skills: [{ type: String }],
    assessments: [{ type: Object }],
    pay: {
      maximum: { type: String },
      minimum: { type: String },
      rate: { type: String },
    },
    postedBy: {
      by: { type: String, enum: ["recruiter", "company"] },
      ref: { type: String, enum: ["User", "Company"] },
      id: { type: Schema.Types.ObjectId, refPath: "postedBy.ref" },
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
