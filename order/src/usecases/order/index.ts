import { Repositories } from "../../database/index.js";
import { CompanyOrders } from "./companyOrders.js";
import { UserOrders } from "./userOrders.js";

const userOrders = new UserOrders(Repositories.OrderRepository);
const companyOrders = new CompanyOrders(Repositories.OrderRepository);

export const OrderUsecases = {
  userOrders,
  companyOrders,
};
