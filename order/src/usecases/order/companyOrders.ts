import { IOrderRepoType } from "../../database/index.js";

export class CompanyOrders {
  constructor(private readonly orderRepository: IOrderRepoType) {}

  async execute({ company }: { company: string }) {
    return await this.orderRepository.allOrderByCompany({ company });
  }
}
