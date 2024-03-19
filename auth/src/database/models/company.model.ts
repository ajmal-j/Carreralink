import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface ICompany extends Document {
  _id: ObjectId;
  email: string;
  password: string;
}

const companySchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const CompanyModel = mongoose.model<ICompany>("Company", companySchema);

export type CompanyModelType = typeof CompanyModel;
