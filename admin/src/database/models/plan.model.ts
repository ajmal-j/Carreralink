import mongoose, { Schema } from "mongoose";

export interface IPlan {
  name: string;
  description: string;
  price: number;
  duration: number;
  plan: "basic" | "premium";
  features: Record<string, boolean>;
  for: "company" | "user";
  isDeleted: boolean;
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
    features: { type: Object },
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
