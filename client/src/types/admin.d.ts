interface IPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  for: "company" | "user";
  plan: "basic" | "premium";
  features: Record<string, boolean> | string[];
}
