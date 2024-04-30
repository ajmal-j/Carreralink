import BuildCreateCheckoutSession from "./createCheckoutSession.js";
import BuildConfirmByUser from "./confirmByUser.js";
import BuildConfirmByCompany from "./confirmByCompany.js";

const createCheckoutSession = BuildCreateCheckoutSession();
const confirmByUser = BuildConfirmByUser();
const confirmByCompany = BuildConfirmByCompany();

export const paymentController = {
  createCheckoutSession,
  confirmByUser,
  confirmByCompany,
};

export type IPaymentController = typeof paymentController;
