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
  id: string;
  paymentId: string;
  createdAt: string;
  recipient: string;
}
