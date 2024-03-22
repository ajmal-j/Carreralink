import { NotFoundError } from "@carreralink/common";
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
    return await this.database
      .find({})
      .select(["name", "website", "logo", "tagline", "industry", "jobs"]);
  }

  async get(id: string): Promise<ICompany> {
    const company = await this.database.findById(id);
    if (!company) throw new NotFoundError("Company not found");
    return company;
  }

  async getId(email: string): Promise<ICompany> {
    const company = await this.database.findOne({ email }).select("_id");
    if (!company) throw new NotFoundError("Company not found");
    return company;
  }

  async update(email: string, company: ICompany): Promise<ICompany> {
    const updatedCompany = await this.database.findOneAndUpdate(
      { email },
      {
        $set: {
          ...company,
        },
      },
      { new: true }
    );
    if (!updatedCompany) throw new NotFoundError("Company not found");
    return updatedCompany;
  }

  async updateJobs(email: string, jobId: any): Promise<ICompany> {
    const updatedCompany = await this.database.findOneAndUpdate(
      { email },
      {
        $push: {
          jobs: jobId,
        },
      },
      { new: true }
    );
    if (!updatedCompany) throw new NotFoundError("Company not found");
    return updatedCompany;
  }

  async allJobsByCompany(email: string): Promise<any> {
    const jobs = await this.database
      .find({ email })
      .select("jobs")
      .populate({
        path: "jobs",
        populate: {
          path: "company",
        },
      });
    return jobs;
  }
}
