import mongoose from "mongoose";
import { NotFoundError } from "@carreralink/common";
import { JobsModelType } from "../models/jobs.model.js";

const ObjectId = mongoose.Types.ObjectId;

export class JobRepository {
  constructor(private readonly database: JobsModelType) {}

  async create(job: any) {
    return await this.database.create(job);
  }
  async job(id: string) {
    return await this.database.findById(id).populate("company");
  }

  async applied(id: string) {
    return await this.database.updateOne(
      { _id: id },
      { $inc: { applicants: 1 } }
    );
  }

  async totalJobs(): Promise<number> {
    return await this.database.countDocuments();
  }

  async totalOpenJobs(): Promise<number> {
    const result = await this.database.aggregate([
      {
        $match: {
          status: "open",
        },
      },
      {
        $group: {
          _id: null,
          count: {
            $sum: 1,
          },
        },
      },
    ]);
    return result[0] ? result[0].count : 0;
  }

  async totalJobsByRecruiter({
    userId,
    companyId,
  }: {
    userId: string;
    companyId: string;
  }): Promise<number> {
    const result = await this.database.aggregate([
      {
        $match: {
          company: new ObjectId(companyId),
          "postedBy.id": new ObjectId(userId),
        },
      },
      {
        $group: {
          _id: null,
          count: {
            $sum: 1,
          },
        },
      },
    ]);
    return result[0] ? result[0].count : 0;
  }

  async totalJobsByCompany({
    companyId,
  }: {
    companyId: string;
  }): Promise<number> {
    const result = await this.database.aggregate([
      {
        $match: {
          company: new ObjectId(companyId),
        },
      },
      {
        $group: {
          _id: null,
          count: {
            $sum: 1,
          },
        },
      },
    ]);
    return result[0] ? result[0].count : 0;
  }

  async totalOpenJobsByRecruiter({
    userId,
    companyId,
  }: {
    userId: string;
    companyId: string;
  }): Promise<number> {
    const result = await this.database.aggregate([
      {
        $match: {
          company: new ObjectId(companyId),
          "postedBy.id": new ObjectId(userId),
          status: "open",
        },
      },
      {
        $group: {
          _id: null,
          count: {
            $sum: 1,
          },
        },
      },
    ]);
    return result[0] ? result[0].count : 0;
  }

  async totalOpenJobsByCompany({
    companyId,
  }: {
    companyId: string;
  }): Promise<number> {
    const result = await this.database.aggregate([
      {
        $match: {
          company: new ObjectId(companyId),
          status: "open",
        },
      },
      {
        $group: {
          _id: null,
          count: {
            $sum: 1,
          },
        },
      },
    ]);
    return result[0] ? result[0].count : 0;
  }

  async withdraw(id: string) {
    return await this.database.updateOne(
      { _id: id },
      { $inc: { applicants: -1 } }
    );
  }

  async allJobs(
    query: {
      page?: number;
      q?: string;
      location?: string;
      type?: string;
      sort?: string;
    },
    companyId?: string
  ) {
    const options = {
      page: query?.page ?? 1,
      limit: 6,
    };

    const sortOptions = {
      "most recent": { $sort: { createdAt: -1 } },
      "least applied": { $sort: { applicants: 1 } },
      "most applied": { $sort: { applicants: -1 } },
      "highest paying": { $sort: { "pay.maximum": -1 } },
      "lowest paying": { $sort: { "pay.minimum": 1 } },
    } as const;

    const sort = query?.sort
      ? sortOptions[query?.sort as keyof typeof sortOptions]
      : sortOptions["most recent"];

    const aggregation = this.database.aggregate([
      {
        $match: {
          status: "open",
          ...(companyId ? { company: new ObjectId(companyId) } : {}),
          ...(query?.location ? { officeLocation: query.location } : {}),
          ...(query?.type ? { workSpace: query.type } : {}),
          ...(query?.q
            ? {
                $text: {
                  $search: query.q,
                  $caseSensitive: false,
                },
              }
            : {}),
        },
      },
      {
        $lookup: {
          from: "companies",
          localField: "company",
          foreignField: "_id",
          as: "company",
        },
      },
      {
        $unwind: "$company",
      },
      sort,
    ]);
    const response = await this.database.aggregatePaginate(
      aggregation,
      options
    );
    return response;
  }
  async allJobsByAdmin(query: {
    page?: number;
    q?: string;
    location?: string;
    type?: string;
    sort?: string;
  }) {
    const options = {
      page: query?.page ?? 1,
      limit: 6,
    };

    const sortOptions = {
      "most recent": { $sort: { createdAt: -1 } },
      "least applied": { $sort: { applicants: 1 } },
      "most applied": { $sort: { applicants: -1 } },
      "highest paying": { $sort: { "pay.maximum": -1 } },
      "lowest paying": { $sort: { "pay.minimum": 1 } },
    } as const;

    const sort = query?.sort
      ? sortOptions[query?.sort as keyof typeof sortOptions]
      : sortOptions["most recent"];

    const aggregation = this.database.aggregate([
      {
        $match: {
          ...(query?.location ? { officeLocation: query.location } : {}),
          ...(query?.type ? { workSpace: query.type } : {}),
          ...(query?.q
            ? {
                $text: {
                  $search: query.q,
                  $caseSensitive: false,
                },
              }
            : {}),
        },
      },
      {
        $lookup: {
          from: "companies",
          localField: "company",
          foreignField: "_id",
          as: "company",
        },
      },
      {
        $unwind: "$company",
      },
      {
        $project: {
          _id: 1,
          title: 1,
          "company.name": 1,
          status: 1,
        },
      },
      sort,
    ]);
    const response = await this.database.aggregatePaginate(
      aggregation,
      options
    );
    return response;
  }
  async allJobsByRecruiter({
    query,
    id,
    companyId,
  }: {
    query: {
      page?: number;
      q?: string;
      location?: string;
      type?: string;
      sort?: string;
    };
    id: string;
    companyId: string;
  }) {
    const options = {
      page: query?.page ?? 1,
      limit: 6,
    };

    const sortOptions = {
      "most recent": { $sort: { createdAt: -1 } },
      "least applied": { $sort: { applicants: 1 } },
      "most applied": { $sort: { applicants: -1 } },
      "highest paying": { $sort: { "pay.maximum": -1 } },
      "lowest paying": { $sort: { "pay.minimum": 1 } },
    } as const;

    const sort = query?.sort
      ? sortOptions[query?.sort as keyof typeof sortOptions]
      : sortOptions["most recent"];

    const aggregation = this.database.aggregate([
      {
        $match: {
          "postedBy.id": new ObjectId(id),
          company: new ObjectId(companyId),
          ...(query?.location ? { officeLocation: query.location } : {}),
          ...(query?.type ? { workSpace: query.type } : {}),
          ...(query?.q
            ? {
                $text: {
                  $search: query.q,
                  $caseSensitive: false,
                },
              }
            : {}),
        },
      },
      {
        $lookup: {
          from: "companies",
          localField: "company",
          foreignField: "_id",
          as: "company",
        },
      },
      {
        $unwind: "$company",
      },
      sort,
    ]);
    const response = await this.database.aggregatePaginate(
      aggregation,
      options
    );

    return response;
  }
  async allJobsByCompany(id: string) {
    return await this.database.find({ company: id }).populate("company");
  }

  async updateJob(id: string, jobData: Record<string, any>) {
    if (jobData.WorkSpace === "Remote") jobData["officeLocation"] = "";
    const job = await this.database.findOneAndUpdate(
      { _id: id },
      {
        $set: jobData,
      }
    );
    if (!job) throw new NotFoundError("Job not found");
    return job;
  }

  async getOfficeLocationsAndLocations() {
    const officeLocations = (
      await this.database.distinct("officeLocation")
    ).filter(Boolean);
    const locations = (await this.database.distinct("workSpace")).filter(
      Boolean
    );
    return { officeLocations, locations };
  }

  async deleteJobs({ jobs }: { jobs: string[] }) {
    return await this.database.deleteMany({ _id: { $in: jobs } });
  }

  async monthlyJobsGraphDataByRecruiter({
    userId,
    companyId,
  }: {
    userId: string;
    companyId: string;
  }) {
    const result = await this.database.aggregate([
      {
        $match: {
          company: new ObjectId(companyId),
          "postedBy.id": new ObjectId(userId),
        },
      },
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
  async yearlyJobsGraphDataByRecruiter({
    userId,
    companyId,
  }: {
    userId: string;
    companyId: string;
  }) {
    const result = await this.database.aggregate([
      {
        $match: {
          company: new ObjectId(companyId),
          "postedBy.id": new ObjectId(userId),
        },
      },
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
}
