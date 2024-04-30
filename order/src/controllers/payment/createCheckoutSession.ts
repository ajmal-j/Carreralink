import { CustomResponse, NotFoundError } from "@carreralink/common";
import { Request } from "express";
import { PaymentUsecase } from "../../usecases/payment/index.js";

export default function () {
  return async (req: Request) => {
    const { product, email } = req.body;
    if (!product) throw new NotFoundError("Product not found");

    if (!email) throw new NotFoundError("Email not found");

    const id = await PaymentUsecase.createSession.execute({
      product,
      email,
    });

    return new CustomResponse().data({ id }).statusCode(200).response();
  };
}
