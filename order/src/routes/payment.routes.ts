import {
  VerifyCompany,
  VerifyUser,
  expressCallback,
} from "@carreralink/common";
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
    "/confirmByUser",
    VerifyUser,
    expressCallback(paymentController.confirmByUser)
  );
  router.post(
    "/confirmByCompany",
    VerifyCompany,
    expressCallback(paymentController.confirmByCompany)
  );
  return router;
};
