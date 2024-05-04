import { Repositories } from "../../database/index.js";
import { AllOrders } from "./allOrders.js";
import { CompanyOrders } from "./companyOrders.js";
import { UserOrders } from "./userOrders.js";

const userOrders = new UserOrders(Repositories.OrderRepository);
const companyOrders = new CompanyOrders(Repositories.OrderRepository);
const allOrders = new AllOrders(Repositories.OrderRepository);

export const OrderUsecases = {
  userOrders,
  companyOrders,
  allOrders,
};
