import mongoose from "mongoose";

export interface IOrder {
  item: {
    id: string;
    name: string;
    description: string;
    price: number;
    duration: number;
    for: "user" | "company";
    plan: "basic" | "premium";
    features: Record<string, any>;
  };
  paymentId: string;
  recipient: string;
}

const orderSchema = new mongoose.Schema<IOrder>(
  {
    item: {
      id: { type: String, required: true },
      for: { type: String, required: true, enum: ["user", "company"] },
      name: { type: String, required: true },
      description: { type: String, required: true },
      price: { type: Number, required: true },
      duration: { type: Number, required: true, default: 1 },
      plan: { type: String, required: true, enum: ["basic", "premium"] },
      features: {
        type: Object,
      },
    },
    paymentId: { type: String, required: true },
    recipient: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

export const OrderModel = mongoose.model<IOrder>("Order", orderSchema);

export type IOrderModel = typeof OrderModel;
