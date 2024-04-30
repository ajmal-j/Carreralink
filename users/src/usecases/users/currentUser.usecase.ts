import { CustomResponse, NotFoundError } from "@carreralink/common";
import { isPast } from "date-fns";
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
        .message("User is blocked");
    }

    if (user?.plan?.expiryDate && isPast(user?.plan?.expiryDate)) {
      return await this.UserDataRepo.updatePlanExpiry({
        user: user.email,
        plan: {
          freeUsage: user?.plan?.freeUsage || 0,
        },
      });
    }

    return user;
  }
}
