import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface ICompany extends Document {
  _id: ObjectId;
  name: string;
  website: string;
  logo: string | null;
  tagline: string;
  email: string;
  industry: string;
  foundedOn: number;
  imageOfCEO: string | null;
  description: string;
  ceo: string;
  revenue: string;
  headquarters: string;
  size: number;
  recruiters: string[];
  jobs: ObjectId[];
  coverPhoto: string | null;
}

const companySchema: Schema = new Schema({
  name: { type: String },
  website: { type: String },
  logo: {
    type: String,
    default:
      "https://raw.githubusercontent.com/ajmal-j/Weather-app-with-ums/master/client/public/companyPlaceHolder.png",
  },
  tagline: { type: String },
  email: { type: String },
  industry: { type: String },
  foundedOn: { type: Number },
  imageOfCEO: {
    type: String,
    default:
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
  },
  description: { type: String },
  ceo: { type: String },
  revenue: { type: String },
  headquarters: { type: String },
  size: { type: Number },
  recruiters: [{ type: String }],
  jobs: [{ type: Schema.Types.ObjectId, ref: "Jobs" }],
  coverPhoto: {
    type: String,
    default:
      "https://raw.githubusercontent.com/ajmal-j/Weather-app-with-ums/master/client/public/companyCover.png",
  },
});

export const CompanyModel = mongoose.model<ICompany>("Company", companySchema);

export type CompanyModelType = typeof CompanyModel;
