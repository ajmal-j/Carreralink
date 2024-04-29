import { IOrderModel } from "../models/order.model.js";

export class OrderRepository {
  constructor(private readonly database: IOrderModel) {}

  async create(data: IOrderModel) {
    return await this.database.create(data);
  }
}
