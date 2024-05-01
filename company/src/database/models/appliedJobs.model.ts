import mongoose, { Schema, Document, ObjectId } from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

export interface IAppliedJob extends Document {
  job: ObjectId;
  user: string;
  score: string;
  isAssessmentDone: boolean;
  assessmentScore: string;
  assessments: Record<string, string | number>[];
  status:
    | "applied"
    | "interview"
    | "shortlisted"
    | "rejected"
    | "underReview"
    | "hired";
  id: string;
  reasonForRejection?: string;
  resume: string;
}

const appliedJobSchema: Schema = new Schema<IAppliedJob>(
  {
    job: { type: Schema.Types.ObjectId, ref: "Jobs", required: true },
    user: { type: String, required: true },
    score: { type: String, default: "Scoring in progress..." },
    isAssessmentDone: { type: Boolean, default: false },
    assessmentScore: { type: String, default: "0" },
    assessments: [{ type: Object }],
    status: {
      type: String,
      enum: [
        "applied",
        "interview",
        "shortlisted",
        "rejected",
        "underReview",
        "hired",
      ],
      default: "applied",
    },
    reasonForRejection: { type: String },
    resume: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

appliedJobSchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

appliedJobSchema.plugin(aggregatePaginate);

export const AppliedJobsModel = mongoose.model<IAppliedJob>(
  "AppliedJobs",
  appliedJobSchema
);

export type AppliedJobsModelType = typeof AppliedJobsModel & {
  aggregatePaginate?: any;
};
