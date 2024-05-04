import BuildUserOrdersController from "./userOrders.js";
import BuildCompanyOrdersController from "./companyOrders.js";
import BuildAllOrdersController from "./allOrders.js";

const userOrders = BuildUserOrdersController();
const companyOrders = BuildCompanyOrdersController();
const allOrders = BuildAllOrdersController();

export const orderController = {
  userOrders,
  companyOrders,
  allOrders,
};

export type IOrderController = typeof orderController;
