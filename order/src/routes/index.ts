import { Router } from "express";
import { PaymentRoutes } from "./payment.routes.js";
import { paymentController } from "../controllers/payment/index.js";
import { OrderRoutes } from "./order.routes.js";
import { orderController } from "../controllers/order/index.js";

const payment = Router();
const order = Router();

const paymentRoutes = PaymentRoutes({
  router: payment,
  paymentController,
});

const orderRoutes = OrderRoutes({ router: order, orderController });

export { paymentRoutes, orderRoutes };
