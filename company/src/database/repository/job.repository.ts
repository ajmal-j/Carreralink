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
  }: {
    query: {
      page?: number;
      q?: string;
      location?: string;
      type?: string;
      sort?: string;
    };
    id: string;
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
}
