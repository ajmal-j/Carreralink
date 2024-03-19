import { Request } from "express";
import { IUser } from "../entities/userData.entity.js";
import { CustomResponse, UnauthorizedError } from "@carreralink/common";
import { currentUserUsecase } from "../usecases/index.js";

interface IRequestUser extends IUser {
  id: string;
}

declare module "express" {
  export interface Request {
    user: IRequestUser | undefined;
  }
}

export const BuildCurrentUser = () => {
  return async (req: Request) => {
    const userData = req?.user;
    if (!userData) throw new UnauthorizedError("User not authenticated");
    const user = await currentUserUsecase.execute(userData.email);

    return new CustomResponse()
      .message("User Data.")
      .statusCode(200)
      .data(user)
      .response();
  };
};
