import { CustomResponse, BadRequestError } from "@carreralink/common";
import { Request } from "express";
import { PaymentUsecase } from "../../usecases/payment/index.js";

export default function () {
  return async (req: Request) => {
    const { id, item } = req.body;
    const userData = req.user;
    if (!id) throw new BadRequestError("Order id not found");
    if (!userData?.email) throw new BadRequestError("Email not found");
    if (!item) throw new BadRequestError("Item not found");
    const order = await PaymentUsecase.confirm.execute({
      id,
      email: userData.email,
      item,
    });
    return new CustomResponse().data(order).statusCode(200).response();
  };
}
