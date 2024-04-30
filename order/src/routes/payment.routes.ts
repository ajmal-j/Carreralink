import { VerifyUser, expressCallback } from "@carreralink/common";
import { IPaymentController } from "../controllers/payment/index.js";

export const PaymentRoutes = ({
  router,
  paymentController,
}: {
  router: any;
  paymentController: IPaymentController;
}) => {
  router.post(
    "/createSession",
    expressCallback(paymentController.createCheckoutSession)
  );
  router.post(
    "/confirm",
    VerifyUser,
    expressCallback(paymentController.confirm)
  );
  return router;
};
