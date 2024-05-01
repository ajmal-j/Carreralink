import { CustomResponse, UnauthorizedError } from "@carreralink/common";
import { Request } from "express";
import { OrderUsecases } from "../../usecases/order/index.js";

export default function () {
  return async (req: Request) => {
    const userData = req?.user;
    if (!userData?.email) throw new UnauthorizedError("User not authenticated");
    const orders = await OrderUsecases.userOrders.execute({
      user: userData.email,
    });
    return new CustomResponse()
      .data(orders)
      .statusCode(200)
      .message("All user orders")
      .response();
  };
}
