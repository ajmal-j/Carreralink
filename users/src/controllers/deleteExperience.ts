import {
  CustomError,
  CustomResponse,
  UnauthorizedError,
} from "@carreralink/common";
import { Request } from "express";
import { deleteExperienceUsecase } from "../usecases/index.js";

export default function () {
  return async (req: Request) => {
    const userData = req?.user;
    if (!userData) throw new UnauthorizedError("User not authenticated");
    const { id } = req.query;
    const email = userData.email;
    if (!id) throw new CustomError("Id is required", 401);
    const user = await deleteExperienceUsecase.execute(email, id as string);
    return new CustomResponse()
      .message("Updated")
      .statusCode(201)
      .data(user as Object)
      .response();
  };
}
