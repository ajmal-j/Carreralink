import { BadRequestError } from "@carreralink/common";
import mongoose, { AggregatePaginateResult } from "mongoose";
import {
  AppliedJobsModelType,
  IAppliedJob,
} from "../models/appliedJobs.model.js";
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

  async updateScore({
    application,
    data,
  }: {
    application: string;
    data: {
      score: string;
      reasonForRejection?: string;
      status?: string;
    };
  }) {
    return await this.database.updateOne(
      {
        _id: application,
      },
      {
        $set: {
          score: data.score,
          reasonForRejection: data?.reasonForRejection,
          ...(data.status && { status: data.status }),
        },
      }
    );
  }
  async updateAssessmentScore({
    job,
    score,
    user,
    reasonForRejection,
    status,
  }: {
    job: string;
    user: string;
    score: string;
    reasonForRejection?: string;
    status?: IAppliedJob["status"];
  }) {
    const application = await this.database.findOne({
      $and: [{ user }, { job }],
    });

    if (!application) throw new BadRequestError("Application not found");

    if (!application?.reasonForRejection && application.status !== "rejected") {
      if (reasonForRejection)
        application.reasonForRejection = reasonForRejection;
      if (status) application.status = status;
      application.assessmentScore = score;
      await application.save();
    }
  }

  async updateAssessment({
    assessments,
    job,
    user,
  }: {
    job: string;
    user: string;
    assessments: Record<string, any>[];
  }) {
    return await this.database.updateOne(
      {
        $and: [{ user }, { job }],
      },
      {
        assessments,
        isAssessmentDone: true,
      },
      {
        new: true,
      }
    );
  }

  async updateStatus({
    user,
    job,
    status,
  }: {
    user: string;
    job: string;
    status: string;
  }) {
    return await this.database.updateOne(
      {
        $and: [{ user }, { job }],
      },
      {
        status,
        reasonForRejection: "",
      },
      {
        new: true,
      }
    );
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

  async totalApplicants(): Promise<number> {
    const result = await this.database.aggregate([
      {
        $match: {
          status: {
            $ne: "rejected",
          },
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

  async totalApplicantsByCompany(company: string): Promise<number> {
    const result = await this.database.aggregate([
      {
        $match: {
          status: {
            $ne: "rejected",
          },
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
        $match: {
          "job.company": new ObjectId(company),
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
  async totalApplicantsByRecruiter({
    userId,
    companyId,
  }: {
    userId: string;
    companyId: string;
  }): Promise<number> {
    const result = await this.database.aggregate([
      {
        $match: {
          status: {
            $ne: "rejected",
          },
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
        $match: {
          "job.postedBy.id": new ObjectId(userId),
          "job.company": new ObjectId(companyId),
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
    await this.monthlyApplicantsByRecruiter({ userId, companyId });
    return result[0] ? result[0].count : 0;
  }

  async monthlyApplicantsByRecruiter({
    userId,
    companyId,
  }: {
    userId: string;
    companyId: string;
  }) {
    const result = await this.database.aggregate([
      {
        $match: {
          status: {
            $ne: "rejected",
          },
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
        $match: {
          "job.postedBy.id": new ObjectId(userId),
          "job.company": new ObjectId(companyId),
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
  async yearlyApplicantsByRecruiter({
    userId,
    companyId,
  }: {
    userId: string;
    companyId: string;
  }) {
    const result = await this.database.aggregate([
      {
        $match: {
          status: {
            $ne: "rejected",
          },
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
        $match: {
          "job.postedBy.id": new ObjectId(userId),
          "job.company": new ObjectId(companyId),
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
  async monthlyApplicantsByCompany({ companyId }: { companyId: string }) {
    const result = await this.database.aggregate([
      {
        $match: {
          status: {
            $ne: "rejected",
          },
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
        $match: {
          "job.company": new ObjectId(companyId),
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
  async yearlyApplicantsByCompany({ companyId }: { companyId: string }) {
    const result = await this.database.aggregate([
      {
        $match: {
          status: {
            $ne: "rejected",
          },
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
        $match: {
          "job.company": new ObjectId(companyId),
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
  async monthlyApplicantsByAdmin() {
    const result = await this.database.aggregate([
      {
        $match: {
          status: {
            $ne: "rejected",
          },
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
  async yearlyApplicantsByAdmin() {
    const result = await this.database.aggregate([
      {
        $match: {
          status: {
            $ne: "rejected",
          },
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

  async getApplicants({
    job,
    query,
  }: {
    job: string;
    query: Record<string, any>;
  }): Promise<AggregatePaginateResult<IAppliedJob[]>> {
    const options = {
      page: query?.p ?? 1,
      limit: 10,
    };
    const aggregation = this.database.aggregate([
      {
        $match: {
          job: new ObjectId(job),
          ...(query.status ? { status: query.status } : {}),
        },
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
        $addFields: {
          totalScore: {
            $add: [
              {
                $convert: {
                  input: "$score",
                  to: "double",
                  onError: 0,
                  onNull: 0,
                },
              },
              { $toDouble: "$assessmentScore" },
            ],
          },
        },
      },
      {
        $unwind: "$user",
      },
      {
        $sort: { totalScore: -1 },
      },
    ]);
    const data = await this.database.aggregatePaginate(aggregation, options);
    return data;
  }
}
