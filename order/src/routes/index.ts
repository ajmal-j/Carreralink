import { Router } from "express";
import { PaymentRoutes } from "./payment.routes.js";
import { paymentController } from "../controllers/payment/index.js";

const payment = Router();

const paymentRoutes = PaymentRoutes({
  router: payment,
  paymentController,
});

export { paymentRoutes };
