import BuildUserOrdersController from "./userOrders.js";

const userOrders = BuildUserOrdersController();

export const orderController = {
  userOrders,
};

export type IOrderController = typeof orderController;
