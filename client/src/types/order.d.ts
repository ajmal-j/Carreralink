interface IOrder {
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
  expired: boolean;
  recipient: string;
  discount?: string;
  id: string;
  createdAt: string;
}
