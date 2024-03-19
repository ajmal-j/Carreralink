import { CustomError } from "@carreralink/common";
import { UserDataRepository } from "../database/repository/userData.repo.js";

export class DeleteEducationUsecase {
  constructor(private readonly userDataRepo: UserDataRepository) {}
  async execute(email: string, id: string) {
    if (!email) throw new CustomError("Email is required", 401);
    if (!id) throw new CustomError("Id is required", 401);
    return await this.userDataRepo.deleteEducation(email, id);
  }
}
