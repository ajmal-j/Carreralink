import { InternalServerError } from "@carreralink/common";
import Stripe from "stripe";

process.loadEnvFile();

export class CreateSessionUseCase {
  private readonly _key: string = "";

  constructor() {
    const key = process.env.STRIPE_SECRET_KEY!;
    if (!key) throw new InternalServerError("Stripe secret key not found");

    this._key = key;
  }

  async execute({
    product,
    email,
  }: {
    product: Record<string, any>;
    email: string;
  }): Promise<string> {
    try {
      const product_details: Stripe.Checkout.SessionCreateParams.LineItem = {
        quantity: 1,
        price_data: {
          currency: "inr",
          product_data: {
            name: product.name,
            description: product.description,
          },
          unit_amount: product.price * 100,
        },
      };

      const success_url =
        product.for === "user"
          ? `http://localhost:3000/success?id={CHECKOUT_SESSION_ID}&product=${product.id}`
          : `http://localhost:3000/dashboard/company/success?id={CHECKOUT_SESSION_ID}&product=${product.id}`;

      const cancel_url =
        product.for === "company"
          ? "http://localhost:3000"
          : "http://localhost:3000/dashboard/company";
      const stripe = new Stripe(this._key);

      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        billing_address_collection: "required",
        customer_email: email,
        line_items: [product_details],
        success_url,
        cancel_url,
      });
      return session.id;
    } catch (error) {
      console.log(error);
      throw new InternalServerError("Currently unable continue with payment");
    }
  }
}
