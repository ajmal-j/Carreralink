import { BadRequestError } from "@carreralink/common";
import {
  AppliedJobsModelType,
  IAppliedJob,
} from "../models/appliedJobs.model.js";
import { AggregatePaginateResult } from "mongoose";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;
export class AppliedJobsRepo {
  constructor(private readonly database: AppliedJobsModelType) {}

  async apply({
    user,
    job,
    resume,
  }: {
    user: string;
    job: string;
    resume: string;
  }): Promise<IAppliedJob> {
    const already = await this.database.findOne({
      $and: [{ user }, { job }],
    });
    if (already) throw new BadRequestError("Already applied");

    return await this.database.create({ user, job, resume });
  }

  async withdraw({ user, job }: { user: string; job: string }): Promise<any> {
    return await this.database.deleteOne({ $and: [{ user }, { job }] });
  }

  async isApplied({
    user,
    job,
  }: {
    user: string;
    job: string;
  }): Promise<IAppliedJob | null> {
    return await this.database.findOne({ $and: [{ user }, { job }] });
  }
  async getAppliedJobs({
    user,
    query,
  }: {
    user: string;
    query: { p: number };
  }): Promise<AggregatePaginateResult<IAppliedJob>> {
    const options = {
      page: query?.p ?? 1,
      limit: 10,
    };
    const aggregation = this.database.aggregate([
      {
        $match: { user },
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

  async getApplicants({
    job,
    query,
  }: {
    job: string;
    query: { p: number };
  }): Promise<AggregatePaginateResult<IAppliedJob[]>> {
    const options = {
      page: query?.p ?? 1,
      limit: 10,
    };
    const aggregation = this.database.aggregate([
      {
        $match: { job: new ObjectId(job) },
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "email",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
    ]);
    return await this.database.aggregatePaginate(aggregation, options);
  }
}
