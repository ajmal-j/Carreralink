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
  async findById(id: string): Promise<ICompany | null> {
    return await this.database.findById(id);
  }
  async totalCompanies(): Promise<number> {
    return await this.database.countDocuments();
  }

  async updatePlan({
    company,
    plan,
  }: {
    company: string;
    plan: ICompany["plan"];
  }) {
    const companyData = await this.database.findOne({
      email: company,
    });
    if (!companyData) throw new NotFoundError("Company not found");
    companyData.plan.currentPlan = plan.currentPlan;
    companyData.plan.expiryDate = plan.expiryDate;
    companyData.plan.purchaseDate = plan.purchaseDate;
    companyData.plan.planType = plan.planType;
    if (!companyData.plan.features) companyData.plan.features = {};
    for (const key in plan.features) {
      companyData.plan.features[key] = true;
    }
    return await companyData.save();
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
          isVerified: true,
          ...(query?.q ? { industry: query.q } : {}),
          ...(query?.search ? { $text: { $search: query?.search } } : {}),
        },
      },
      {
        $project: {
          name: 1,
          website: 1,
          email: 1,
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
    const company = await this.database.findById({ _id: id });
    if (!company) throw new NotFoundError("Company not found");
    return company;
  }

  async getId(email: string): Promise<ICompany> {
    const companyId = await this.database.findOne({ email }).select("_id");
    if (!companyId) throw new NotFoundError("Company not found");
    return companyId;
  }

  async update({
    email,
    companyData,
    id,
  }: {
    email?: string;
    companyData: ICompany;
    id?: string;
  }): Promise<ICompany> {
    const updatedCompany = await this.database.findOneAndUpdate(
      {
        ...(id ? { _id: id } : { email }),
      },
      {
        $set: {
          ...companyData,
        },
      },
      { new: true }
    );
    if (!updatedCompany) throw new NotFoundError("Company not found");
    return updatedCompany;
  }

  async updateCoverPhoto(email: string, url: string): Promise<ICompany> {
    const updatedCompany = await this.database.findOneAndUpdate(
      { email },
      {
        $set: {
          coverPhoto: url,
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
          isVerified: 1,
          email: 1,
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
          email: 1,
          isVerified: 1,
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

  async confirmVerification(id: string) {
    return await this.database.findOneAndUpdate(
      { _id: id },
      { isVerified: true }
    );
  }
  async companyList(q: string) {
    const regex = new RegExp(q, "i");
    return await this.database
      .find({ name: regex })
      .select(["name", "logo", "headquarters", "email"]);
  }
  async rejectVerification(id: string) {
    const company = await this.database.findOne({ _id: id });
    if (!company) throw new NotFoundError("Company not found");
    await this.database.findOneAndDelete({ _id: id });
    return company;
  }

  async isVerified(email: string) {
    const company = await this.findByEmail(email);
    if (!company) throw new NotFoundError("Company not found");
    return company?.isVerified;
  }

  async yearlyCompanyGraphDataByAdmin() {
    const result = await this.database.aggregate([
      {
        $group: {
          _id: {
            $year: "$createdAt",
          },
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const now = new Date().getFullYear();

    const data = Array.from({ length: now - 2022 }, () => 0);
    for (const res of result) {
      data[res._id - 2023] = res.count;
    }
    return data;
  }
  async monthlyCompanyGraphDataByAdmin() {
    const result = await this.database.aggregate([
      {
        $group: {
          _id: {
            $month: "$createdAt",
          },
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const data = Array.from({ length: 12 }, () => 0);
    for (const res of result) {
      data[res._id - 1] = res.count;
    }
    return data;
  }
}
