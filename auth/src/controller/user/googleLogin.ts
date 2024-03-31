import {
  CustomError,
  CustomResponse,
  NotFoundError,
  generateToken,
} from "@carreralink/common";
import { IEventProducer } from "../../events/producers/producer.js";
import { googleLoginUsecase } from "../../usecases/index.js";
import { Request } from "express";

export default function (eventProducer: IEventProducer) {
  return async (req: Request) => {
    const userData = req.body;

    const user = await googleLoginUsecase.execute(userData);

    if (user instanceof CustomResponse) return user.response();

    // eventProducer.googleLogin(userData);
    const token = generateToken(user);

    return new CustomResponse()
      .message("Login successful")
      .cookie("userToken", token, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      .data({ token, ...user })
      .response();
  };
}
