import { IUserDataRepo } from "../../database/index.js";

export class UpdatePlanUsageUsecase {
  constructor(private readonly UserDataRepo: IUserDataRepo) {}

  async execute(data: Record<string, any>) {
    const { email } = data;
    if (!email) return console.log("email not found");
    const updated = await this.UserDataRepo.planUsed(email);
    if (!updated.matchedCount) return console.log("user not found");
    console.log(updated, "plan updated");
  }
}
