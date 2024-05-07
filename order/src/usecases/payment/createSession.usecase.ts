import { CustomError, InternalServerError } from "@carreralink/common";
import { addMonths, isPast } from "date-fns";
import Stripe from "stripe";
import { IOrderRepoType } from "../../database/index.js";

process.loadEnvFile();

export class CreateSessionUseCase {
  private readonly _key: string = "";
  private readonly origin: string = process.env.CLIENT_URL!;

  constructor(private readonly OrderRepository: IOrderRepoType) {
    const key = process.env.STRIPE_SECRET_KEY!;
    if (!key) throw new InternalServerError("Stripe secret key not found");
    if (!this.origin) throw new InternalServerError("Client url not found");

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
      const exist = await this.OrderRepository.isCurrent({
        email,
        productId: product.id,
      });
      if (exist) {
        const expiryDate = addMonths(exist.createdAt, exist.item.duration);
        const isExpired = isPast(new Date(expiryDate));
        if (!isExpired)
          throw new CustomError("Already have an active subscription", 401);
      }

      let price: number = product.price;
      let discount: number = 0;

      const currentPlan = await this.OrderRepository.currentPlan({
        email,
      });

      if (currentPlan) {
        const expiryDate = addMonths(
          currentPlan.createdAt,
          currentPlan.item.duration
        );
        const isExpired = isPast(new Date(expiryDate));
        if (!isExpired) {
          discount = product.price * 0.3;
          price = Math.floor(product.price - discount);
        }
      }

      const product_details: Stripe.Checkout.SessionCreateParams.LineItem = {
        quantity: 1,
        price_data: {
          currency: "inr",
          product_data: {
            name: product.name,
            description: product.description,
          },
          unit_amount: price * 100,
        },
      };

      const success_url =
        product.for === "user"
          ? `${this.origin}/success?id={CHECKOUT_SESSION_ID}&product=${product.id}`
          : `${this.origin}/dashboard/company/success?id={CHECKOUT_SESSION_ID}&product=${product.id}`;

      const cancel_url =
        product.for === "company"
          ? `${this.origin}`
          : `${this.origin}/dashboard/company`;
          
      const stripe = new Stripe(this._key);

      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        billing_address_collection: "required",
        metadata: {
          discount,
        },
        customer_email: email,
        line_items: [product_details],
        success_url,
        cancel_url,
      });
      return session.id;
    } catch (error) {
      console.log(error);
      if (error instanceof CustomError) throw error;
      throw new InternalServerError("Currently unable continue with payment");
    }
  }
}
