import { Request } from "express";
import { IUser } from "../../entities/userData.entity.js";
import { CustomResponse, UnauthorizedError } from "@carreralink/common";
import { currentUserUsecase } from "../../usecases/index.js";

interface IRequestUser extends IUser {
  id: string;
}

declare module "express" {
  export interface Request {
    adminData: IRequestUser | undefined;
  }
}

export default function () {
  return async (req: Request) => {
    const adminData = req?.adminData;
    if (!adminData) throw new UnauthorizedError("Admin not authenticated");
    const user = await currentUserUsecase.execute(adminData.email);

    return new CustomResponse()
      .message("Admin Data.")
      .statusCode(200)
      .data(user)
      .response();
  };
}
