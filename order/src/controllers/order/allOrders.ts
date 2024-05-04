import { Request } from "express";
import { OrderUsecases } from "../../usecases/order/index.js";
import { CustomResponse } from "@carreralink/common";

export default function () {
  return async (req: Request) => {
    const data = await OrderUsecases.allOrders.execute();
    return new CustomResponse()
      .data(data)
      .statusCode(200)
      .message("All Orders.")
      .response();
  };
}
