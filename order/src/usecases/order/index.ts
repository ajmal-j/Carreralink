import { Repositories } from "../../database/index.js";
import { UserOrders } from "./userOrders.js";

const userOrders = new UserOrders(Repositories.OrderRepository);

export const OrderUsecases = {
  userOrders,
};
