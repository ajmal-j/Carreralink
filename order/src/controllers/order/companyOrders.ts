import { CustomResponse, UnauthorizedError } from "@carreralink/common";
import { Request } from "express";
import { OrderUsecases } from "../../usecases/order/index.js";

export default function () {
  return async (req: Request) => {
    const companyData = req?.companyData;
    if (!companyData?.email)
      throw new UnauthorizedError("Company not authenticated");
    const orders = await OrderUsecases.companyOrders.execute({
      company: companyData.email,
    });
    return new CustomResponse()
      .data(orders)
      .statusCode(200)
      .message("All company orders")
      .response();
  };
}
