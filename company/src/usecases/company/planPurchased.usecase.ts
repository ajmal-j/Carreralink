import { add } from "date-fns";
import { ICompanyRepoType } from "../../database/index.js";
import { IOrder } from "../../types/order.js";
import { ICompany } from "../../database/models/company.model.js";

export class PlanPurchasedUsecase {
  constructor(private readonly CompanyRepository: ICompanyRepoType) {}

  async execute({ data }: { data: IOrder }) {
    if (!data) return console.log("no data found");
    const expiryDate = add(data.createdAt, {
      months: data.item?.duration,
    });
    const update: ICompany["plan"] = {
      currentPlan: data.id,
      expiryDate,
      planType: data.item.plan,
      features: data.item.features,
      purchaseDate: data.createdAt,
    };
    await this.CompanyRepository.updatePlan({
      company: data.recipient,
      plan: update,
    });
  }
}
