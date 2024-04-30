import { CustomError, InternalServerError } from "@carreralink/common";
import Stripe from "stripe";
import { IOrderRepoType } from "../../database/index.js";
import { IOrder } from "../../database/models/order.model.js";
import { IEventProducer } from "../../events/producer/producer.js";

process.loadEnvFile();

export class ConfirmPaymentUsecase {
  private readonly _key: string = "";

  constructor(
    private readonly orderRepository: IOrderRepoType,
    private readonly eventProducer: IEventProducer
  ) {
    const key = process.env.STRIPE_SECRET_KEY!;
    if (!key) throw new InternalServerError("Stripe secret key not found");

    this._key = key;
  }

  async execute({
    id,
    user,
    item,
  }: {
    id: string;
    user: { email: string };
    item: IOrder["item"];
  }): Promise<IOrder> {
    try {
      const stripe = new Stripe(this._key);
      let event = await stripe.checkout.sessions.retrieve(id);
      if (!event) throw new InternalServerError("Session not found");
      if (event.payment_status === "paid") {
        const data: IOrder = {
          item,
          paymentId: event.id,
          recipient: user.email,
        };
        const isOrderExist = await this.orderRepository.isOrderExist({
          paymentId: event.id,
          productId: item.id,
          recipient: user.email,
        });
        if (isOrderExist) return isOrderExist;
        const order = await this.orderRepository.create(data);
        if (!order) throw new InternalServerError("Unable to create order.");
        //handle events
        if (order.item.for === "user") {
          await this.eventProducer.planPurchasedByUser({
            order,
          });
        } else if (order.item.for === "company") {
          await this.eventProducer.planPurchasedByCompany({
            order,
          });
        }
        return order;
      } else if (event.payment_status === "unpaid") {
        throw new CustomError("Payment not completed", 400);
      } else throw new InternalServerError("Payment not found");
    } catch (error) {
      console.log(error);
      // @ts-expect-error
      const message = error?.raw.message || error?.message || "Invalid payment";
      throw new CustomError(message, 500);
    }
  }
}
