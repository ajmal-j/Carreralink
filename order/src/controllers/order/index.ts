import BuildUserOrdersController from "./userOrders.js";
import BuildCompanyOrdersController from "./companyOrders.js";

const userOrders = BuildUserOrdersController();
const companyOrders = BuildCompanyOrdersController();

export const orderController = {
  userOrders,
  companyOrders,
};

export type IOrderController = typeof orderController;
