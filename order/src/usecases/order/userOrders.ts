import { IOrderRepoType } from "../../database/index.js";

export class UserOrders {
  constructor(private readonly orderRepository: IOrderRepoType) {}

  async execute({ user }: { user: string }) {
    return await this.orderRepository.allOrderByUser({ user });
  }
}
