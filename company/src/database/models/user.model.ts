import mongoose, { Schema, Document, ObjectId } from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

export interface IUser extends Document {
  _id: ObjectId;
  profile: string;
  email: string;
  username: string;
}

const userSchema: Schema = new Schema<IUser>(
  {
    profile: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    email: { type: String, unique: true, required: true },
    username: { type: String, unique: true, required: true },
  },
  {
    timestamps: true,
  }
);

userSchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

userSchema.plugin(aggregatePaginate);

userSchema.index(
  { username: "text", email: "text" },
  { default_language: "english" }
);

export const UserModel = mongoose.model<IUser>("User", userSchema);

export type UserModelType = typeof UserModel & {
  aggregatePaginate?: any;
};
