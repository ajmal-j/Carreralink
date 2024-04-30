import BuildCreateCheckoutSession from "./createCheckoutSession.js";
import BuildConfirm from "./confirm.js";

const createCheckoutSession = BuildCreateCheckoutSession();
const confirm = BuildConfirm();

export const paymentController = {
  createCheckoutSession,
  confirm,
};

export type IPaymentController = typeof paymentController;
