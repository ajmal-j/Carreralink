import { Request } from "express";
import { IUser } from "../../entities/userData.entity.js";
import { CustomResponse, UnauthorizedError } from "@carreralink/common";
import { currentUserUsecase } from "../../usecases/index.js";

interface IRequestUser extends IUser {
  id: string;
}

declare module "express" {
  export interface Request {
    user: IRequestUser | undefined;
    adminData: IRequestUser | undefined;
  }
}

export const BuildCurrentUser = () => {
  return async (req: Request) => {
    const userData = req?.user;
    if (!userData) throw new UnauthorizedError("User not authenticated");
    const response = await currentUserUsecase.execute(userData.email);

    if (response instanceof CustomResponse) return response.response();
    else
      return new CustomResponse()
        .message("User Data.")
        .statusCode(200)
        .data(response)
        .response();
  };
};
