import { CompanyModelType, ICompany } from "../models/company.model.js";

interface ICompanyRepository {
  create(company: ICompany): Promise<ICompany>;
  allCompanies(): Promise<ICompany[]>;
}

export class CompanyRepository implements ICompanyRepository {
  constructor(public readonly database: CompanyModelType) {}

  async create(company: ICompany): Promise<ICompany> {
    return await this.database.create(company);
  }

  async findByEmail(email: string): Promise<ICompany | null> {
    return await this.database.findOne({ email });
  }
  async allCompanies(): Promise<ICompany[]> {
    return await this.database.find({});
  }
}
