import { IOrder, IOrderModel } from "../models/order.model.js";

export class OrderRepository {
  constructor(private readonly database: IOrderModel) {}

  async create(data: IOrder): Promise<IOrder> {
    return await this.database.create(data);
  }
  async isOrderExist({
    productId,
    recipient,
    paymentId,
  }: {
    productId: string;
    recipient: string;
    paymentId: string;
  }): Promise<IOrder | null> {
    return await this.database.findOne({
      $and: [{ "item.id": productId }, { recipient }, { paymentId }],
    });
  }
  async allOrderByUser({ user }: { user: string }) {
    return await this.database
      .find({ recipient: user })
      .sort({ createdAt: -1 });
  }
}
