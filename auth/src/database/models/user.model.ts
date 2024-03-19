import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IUserAuth extends Document {
  _id: ObjectId;
  contact: Number;
  username: String;
  email: String;
  password: String;
  role: String | null;
  isAdmin: Boolean;
}

const UserSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    contact: { type: Number, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "recruiter"], default: "user" },
    isAdmin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model<IUserAuth>("Users", UserSchema);
export type UserModelType = typeof UserModel;
