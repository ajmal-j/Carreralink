import { BadRequestError, CustomResponse } from "@carreralink/common";
import { Request } from "express";
import { createRequestUsecase } from "../../usecases/index.js";

interface IRequestUser {
  id: string;
  email: string;
}

declare module "express" {
  export interface Request {
    user: IRequestUser | undefined;
  }
}

export default function () {
  return async (req: Request) => {
    const data = req.body;
    const user = req?.user;
    if (!user?.email) throw new BadRequestError("User not authenticated");
    if (!data) throw new BadRequestError("Request data not found");
    await createRequestUsecase.execute({
      ...data,
      email : user.email
    });
    return new CustomResponse()
      .message("Request created")
      .statusCode(201)
      .response();
  };
}
