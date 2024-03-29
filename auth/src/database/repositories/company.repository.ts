import { CompanyModelType } from "../models/company.model.js";
import { ICompany } from "../../entities/company.entity.js";
import { CustomError } from "@carreralink/common";
export class CompanyRepository {
  constructor(private readonly database: CompanyModelType) {}

  async createCompany(company: ICompany) {
    const companyExists = await this.findByEmail(company.email);
    if (companyExists) throw new CustomError("Company already exists", 409);
    return await this.database.create(company);
  }

  async findByEmail(email: string) {
    return await this.database.findOne({ email });
  }
  async deleteOne({ email }: { email: string }) {
    return await this.database.deleteOne({ email });
  }
}
