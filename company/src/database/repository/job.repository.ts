import { NotFoundError } from "@carreralink/common";
import { JobsModelType } from "../models/jobs.model.js";

export class JobRepository {
  constructor(private readonly database: JobsModelType) {}

  async create(job: any) {
    return await this.database.create(job);
  }
  async job(id: string) {
    return await this.database.findById(id).populate("company");
  }
  async allJobs(query: {
    page?: number;
    q?: string;
    location?: string;
    type?: string;
  }) {
    const options = {
      page: query?.page ?? 1,
      limit: 6,
    };

    const aggregation = this.database.aggregate([
      {
        $match: {
          status: "open",
          ...(query?.q ? { $text: { $search: query.q } } : {}),
          ...(query?.location ? { location: query.location } : {}),
          ...(query?.type ? { type: query.type } : {}),
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

  async updateJob(id: string, jobData: {}) {
    const job = await this.database.findOneAndUpdate(
      { _id: id },
      {
        $set: jobData,
      }
    );
    if (!job) throw new NotFoundError("Job not found");
    return job;
  }
}
