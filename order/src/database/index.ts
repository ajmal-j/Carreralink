import { OrderModel } from "./models/order.model.js";
import { OrderRepository } from "./repository/order.repo.js";

export const Repositories = {
  OrderRepository: new OrderRepository(OrderModel),
};

export type IOrderRepoType = (typeof Repositories)["OrderRepository"];
