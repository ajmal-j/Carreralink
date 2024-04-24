import mongoose, { Schema } from "mongoose";

export interface IPlan {
  name: string;
  isDeleted: boolean;
  description: string;
  price: number;
  duration: number;
  for: "company" | "user";
  plan: "basic" | "premium";
}

const planSchema = new Schema<IPlan>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: Number, required: true, default: 1 },
    for: { type: String, required: true, enum: ["company", "user"] },
    plan: { type: String, required: true, enum: ["basic", "premium"] },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

export const PlanModel = mongoose.model<IPlan>("Plans", planSchema);

export type IPlanModel = typeof PlanModel;
