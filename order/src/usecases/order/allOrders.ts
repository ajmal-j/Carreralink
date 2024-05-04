import { IOrderRepoType } from "../../database/index.js";

export class AllOrders {
  constructor(private readonly orderRepository: IOrderRepoType) {}

  async execute() {
    const [userOrders, companyOrders] = await Promise.all([
      this.orderRepository.userOrders(),
      this.orderRepository.companyOrders(),
    ]);

    return {
      userOrders,
      companyOrders,
    };
  }
}
