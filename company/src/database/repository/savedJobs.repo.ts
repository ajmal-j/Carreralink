import { AggregatePaginateResult } from "mongoose";
import { ISavedJobs, SavedJobModelType } from "../models/savedJobs.model.js";

export class SavedJobsRepo {
  constructor(private readonly database: SavedJobModelType) {}

  async save(data: Record<string, any>): Promise<ISavedJobs> {
    return await this.database.create(data);
  }

  async remove({ user, job }: { user: string; job: string }): Promise<any> {
    return await this.database.deleteOne({
      $and: [{ user }, { job }],
    });
  }
  async isSaved({
    job,
    user,
  }: {
    job: string;
    user: string;
  }): Promise<ISavedJobs | null> {
    return await this.database.findOne({
      $and: [{ user }, { job }],
    });
  }
  async getSavedJobs({
    email,
    query,
  }: {
    email: string;
    query: {
      p: number;
    };
  }): Promise<AggregatePaginateResult<ISavedJobs>> {
    const options = {
      page: query?.p ?? 1,
      limit: 10,
    };
    const aggregation = this.database.aggregate([
      {
        $match: {
          user: email,
        },
      },
      {
        $lookup: {
          from: "jobs",
          localField: "job",
          foreignField: "_id",
          as: "job",
        },
      },
      {
        $unwind: "$job",
      },
      {
        $lookup: {
          from: "companies",
          localField: "job.company",
          foreignField: "_id",
          as: "job.company",
        },
      },
      {
        $unwind: "$job.company",
      },
    ]);
    return await this.database.aggregatePaginate(aggregation, options);
  }
}
