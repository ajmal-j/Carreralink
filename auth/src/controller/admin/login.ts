import {
  BadRequestError,
  CustomResponse,
  generateToken,
} from "@carreralink/common";
import { Request } from "express";
import { adminLoginUsecase } from "../../usecases/index.js";

export default function () {
  return async (req: Request) => {
    const { email, password } = req.body;
    if (!email || !password)
      throw new BadRequestError("Email and password are required");

    const admin = await adminLoginUsecase.execute(email, password);

    const token = generateToken(admin);

    return new CustomResponse()
      .cookie("adminToken", token, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      .data({ token, ...admin })
      .message("Login successful")
      .statusCode(200)
      .response();
  };
}
