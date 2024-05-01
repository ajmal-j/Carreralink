import {
  VerifyCompany,
  VerifyUser,
  expressCallback,
} from "@carreralink/common";
import { IOrderController } from "../controllers/order/index.js";

export function OrderRoutes({
  router,
  orderController,
}: {
  router: any;
  orderController: IOrderController;
}) {
  router.get(
    "/userOrders",
    VerifyUser,
    expressCallback(orderController.userOrders)
  );
  router.get(
    "/companyOrders",
    VerifyCompany,
    expressCallback(orderController.companyOrders)
  );
  return router;
}
