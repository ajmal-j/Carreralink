import { CustomResponse, NotFoundError } from "@carreralink/common";
import { Request } from "express";
import { resentOtpUsecase } from "../../usecases/index.js";

export default function () {
  return async (req: Request) => {
    const { email } = req.body;
    if (!email) throw new NotFoundError("Email is required");
    await resentOtpUsecase.execute({ email });
    return new CustomResponse()
      .message("OTP sent successfully")
      .statusCode(200)
      .response();
  };
}
