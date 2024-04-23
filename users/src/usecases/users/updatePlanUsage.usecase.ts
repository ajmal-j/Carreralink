import { IUserDataRepo } from "../../database/index.js";

export class UpdatePlanUsageUsecase {
  constructor(private readonly UserDataRepo: IUserDataRepo) {}

  async execute(data: Record<string, any>) {
    const { user } = data;
    const email = user?.email;
    if (!email) return console.log("email not found");
    const updated = await this.UserDataRepo.planUsed(email);
    if (!updated) return console.log("user not found");
  }
}
