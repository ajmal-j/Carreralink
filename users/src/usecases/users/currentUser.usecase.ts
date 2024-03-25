import {
  CustomResponse,
  NotFoundError,
  UnauthorizedError,
} from "@carreralink/common";
import { IUserDataRepo } from "../../database/index.js";

export class CurrentUserUsecase {
  constructor(private readonly UserDataRepo: IUserDataRepo) {}

  async execute(email: string) {
    const user = await this.UserDataRepo.findByEmail(email);
    if (!user) throw new NotFoundError("User not found");
    if (user?.isBlocked) {
      return new CustomResponse()
        .statusCode(401)
        .deleteCookie("userToken")
        .message("User is blocked")
    }
    return user;
  }
}
