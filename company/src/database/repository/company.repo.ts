import { NotFoundError } from "@carreralink/common";
import { CompanyModelType, ICompany } from "../models/company.model.js";
import { AggregatePaginateResult } from "mongoose";

interface ICompanyRepository {
  create(company: ICompany): Promise<ICompany>;
  allCompanies(query: {
    p: number;
    q?: string;
  }): Promise<AggregatePaginateResult<ICompany>>;
}

export class CompanyRepository implements ICompanyRepository {
  constructor(public readonly database: CompanyModelType) {}

  async create(company: ICompany): Promise<ICompany> {
    return await this.database.create(company);
  }

  async findByEmail(email: string): Promise<ICompany | null> {
    return await this.database.findOne({ email });
  }
  async allCompanies(query: {
    p: number;
    q?: string;
    search?: string;
  }): Promise<AggregatePaginateResult<ICompany>> {
    const options = {
      page: query.p ?? 1,
      limit: 10,
    };

    const aggregation = this.database.aggregate([
      {
        $match: {
          ...(query?.q ? { industry: query.q } : {}),
          ...(query?.search ? { $text: { $search: query?.search } } : {}),
        },
      },
      {
        $project: {
          name: 1,
          website: 1,
          logo: 1,
          tagline: 1,
          industry: 1,
          jobs: 1,
        },
      },
    ]);

    const response = await this.database.aggregatePaginate(
      aggregation,
      options
    );
    const topIndustries = await this.topIndustries();
    response["topIndustries"] = topIndustries;

    return response;
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

  async allJobsByCompany(email: string): Promise<ICompany[]> {
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

  async topIndustries(): Promise<string[]> {
    return await this.database.distinct("industry");
  }

  async verifiedCompanies(query: {
    p: number;
  }): Promise<AggregatePaginateResult<ICompany>> {
    const options = {
      page: query.p ?? 1,
      limit: 10,
    };

    const aggregation = this.database.aggregate([
      {
        $match: { isVerified: true },
      },
      {
        $project: {
          name: 1,
          website: 1,
          logo: 1,
          tagline: 1,
          industry: 1,
          jobs: 1,
        },
      },
    ]);

    const response = await this.database.aggregatePaginate(
      aggregation,
      options
    );
    return response;
  }
  async unverifiedCompanies(query: {
    p: number;
  }): Promise<AggregatePaginateResult<ICompany>> {
    const options = {
      page: query.p ?? 1,
      limit: 10,
    };

    const aggregation = this.database.aggregate([
      {
        $match: { isVerified: false },
      },
      {
        $project: {
          name: 1,
          website: 1,
          logo: 1,
          tagline: 1,
          industry: 1,
          jobs: 1,
        },
      },
    ]);

    const response = await this.database.aggregatePaginate(
      aggregation,
      options
    );
    return response;
  }
}
