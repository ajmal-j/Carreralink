import { IOrder, IOrderModel } from "../models/order.model.js";

export class OrderRepository {
  constructor(private readonly database: IOrderModel) {}

  async create(data: Omit<IOrder, "createdAt">): Promise<IOrder> {
    await this.database.updateMany(
      { recipient: data.recipient },
      {
        $set: {
          expired: true,
        },
      }
    );
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

  async isCurrent({
    email,
    productId,
  }: {
    email: string;
    productId: string;
  }): Promise<IOrder | null> {
    return await this.database
      .findOne({
        $and: [
          { recipient: email },
          { "item.id": productId },
          { expired: false },
        ],
      })
      .sort({ createdAt: -1 })
      .limit(1);
  }

  async currentPlan({ email }: { email: string }): Promise<IOrder | null> {
    return await this.database
      .findOne({ $and: [{ recipient: email }, { expired: false }] })
      .sort({ createdAt: -1 })
      .limit(1);
  }

  async allOrderByCompany({ company }: { company: string }) {
    return await this.database
      .find({ recipient: company })
      .sort({ createdAt: -1 });
  }

  async companyOrders() {
    return await this.database.find({
      "item.for": "company",
    });
  }

  async userOrders() {
    return await this.database.find({
      "item.for": "user",
    });
  }
}
