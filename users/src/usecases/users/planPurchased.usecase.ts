import { IUserDataRepo } from "../../database/index.js";
import { IUserData } from "../../database/models/userData.model.js";
import { IOrder } from "../../types/order.js";
import { add } from "date-fns";

export class PlanPurchasedUseCase {
  constructor(private readonly UserDataRepo: IUserDataRepo) {}

  async execute({ data }: { data: IOrder }) {
    if (!data) return console.log("no data found");
    const expiryDate = add(data.createdAt, {
      months: data.item?.duration,
    });
    const update: Omit<IUserData["plan"], "freeUsage"> = {
      currentPlan: data.id,
      expiryDate,
      planType: data.item.plan,
      features: data.item.features,
      purchaseDate: data.createdAt,
    };
    await this.UserDataRepo.updatePlan({ user: data.recipient, plan: update });
  }
}
