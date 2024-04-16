import mongoose from "mongoose";
import { InterviewModelType } from "../models/interview.model.js";
const ObjectId = mongoose.Types.ObjectId;
export class InterviewRepository {
  constructor(private readonly database: InterviewModelType) {}

  async create(data: Record<string, any>) {
    return await this.database.create(data);
  }

  async cancelInterview({
    cancelledBy,
    interview,
    reason,
  }: {
    interview: string;
    reason: string;
    cancelledBy: "interviewer" | "applicant";
  }) {
    return await this.database.updateOne(
      { _id: interview },
      {
        $set: {
          cancelled: {
            cancelledBy,
            reason,
          },
          status: "cancelled",
        },
      }
    );
  }

  async updateInterview({
    agenda,
    startDate,
    time,
    interview,
    interviewer,
  }: {
    interview: string;
    startDate: string;
    agenda: string;
    time: string;
    interviewer: string;
  }) {
    return this.database.updateOne(
      {
        $and: [{ _id: interview }, { interviewer: new ObjectId(interviewer) }],
      },
      {
        $set: {
          agenda,
          startDate,
          time,
        },
      }
    );
  }

  async getInterviews({
    applicant,
    query,
  }: {
    applicant: string;
    query: {
      p: number;
    };
  }) {
    const options = {
      page: query?.p ?? 1,
      limit: 6,
    };

    const aggregation = this.database.aggregate([
      {
        $match: {
          applicant: new ObjectId(applicant),
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
        $lookup: {
          from: "users",
          localField: "interviewer",
          foreignField: "_id",
          as: "interviewer",
        },
      },
      {
        $unwind: "$job",
      },
      {
        $unwind: "$interviewer",
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

    const response = await this.database.aggregatePaginate(
      aggregation,
      options
    );
    return response;
  }
  async getInterviewsByRecruiter({
    interviewer,
    query,
  }: {
    interviewer: string;
    query: {
      p: number;
    };
  }) {
    const options = {
      page: query?.p ?? 1,
      limit: 6,
    };

    const aggregation = this.database.aggregate([
      {
        $match: {
          interviewer: new ObjectId(interviewer),
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
        $lookup: {
          from: "users",
          localField: "applicant",
          foreignField: "_id",
          as: "applicant",
        },
      },
      {
        $unwind: "$job",
      },
      {
        $unwind: "$applicant",
      },
    ]);

    const response = await this.database.aggregatePaginate(
      aggregation,
      options
    );
    return response;
  }
}
