import { Producer } from "kafkajs";
import { IOrder } from "../../database/models/order.model.js";

export function buildPlanPurchasedByCompanyProducer(producer: Producer) {
  return async ({ order }: { order: IOrder }) => {
    await producer.send({
      topic: "plan-purchased-by-company",
      messages: [
        {
          value: JSON.stringify({ order }),
        },
      ],
    });
  };
}
