import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IOtp extends Document {
  _id: ObjectId;
  email: string;
  otp: string;
  expiresAt: Date;
}

const otpSchema: Schema = new Schema<IOtp>(
  {
    email: { type: String, required: true, unique: true },
    otp: {
      type: String,
      required: true,
    },
    expiresAt: { type: Date, default: Date.now(), index: { expires: "5m" } },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

export const OtpModel = mongoose.model<IOtp>("otp", otpSchema);

export type OtpModelType = typeof OtpModel
