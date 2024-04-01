import mongoose, { Schema, Document, ObjectId } from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

export interface ISavedJobs extends Document {
  job: ObjectId;
  user: string;
  id: string;
}

const savedJobSchema: Schema = new Schema<ISavedJobs>(
  {
    job: { type: Schema.Types.ObjectId, ref: "Jobs" },
    user: { type: String },
    id: { type: String },
  },
  {
    timestamps: true,
  }
);

savedJobSchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

savedJobSchema.plugin(aggregatePaginate);

savedJobSchema.index(
  { title: "text", category: "text" },
  { default_language: "english" }
);

export const SavedJobModel = mongoose.model<ISavedJobs>(
  "SavedJobs",
  savedJobSchema
);

export type SavedJobModelType = typeof SavedJobModel & {
  aggregatePaginate?: any;
};
