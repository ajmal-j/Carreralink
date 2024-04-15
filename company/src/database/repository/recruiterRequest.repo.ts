import { CustomError } from "@carreralink/common";
import mongoose, { ObjectId } from "mongoose";
import { ICompany } from "../models/company.model.js";
import {
  IRecruiterRequest,
  IRecruiterRequestModel,
} from "../models/recruiterRequest.model.js";
import { IUser } from "../models/user.model.js";
const ObjectId = mongoose.Types.ObjectId;

interface IIsRecruiter extends Omit<IRecruiterRequest, "company" | "user"> {
  company: ICompany;
  user: IUser;
}

export class RecruiterRequestRepository {
  constructor(private readonly database: IRecruiterRequestModel) {}

  async create({
    ...data
  }: {
    user: string;
    company: string;
    message: string;
  }): Promise<IRecruiterRequest> {
    const exist = await this.database.findOne({
      $and: [{ user: data.user }, { company: data.company }],
    });
    if (exist?.status === "rejected")
      throw new CustomError("Your request has been rejected", 409);
    if (exist) throw new CustomError("Request already submitted.", 409);
    else return await this.database.create(data);
  }
  async isRecruiter(user: string): Promise<IIsRecruiter | null> {
    return await this.database
      .findOne({
        $and: [{ user }, { status: "accepted" }],
      })
      .populate([
        {
          path: "company",
        },
        {
          path: "user",
        },
      ]);
  }

  async totalRecruiters(id: string): Promise<number> {
    return await this.database.countDocuments({
      company: new ObjectId(id),
      status: "accepted",
    });
  }

  async assign({ id }: { id: string }): Promise<IRecruiterRequest | null> {
    return await this.database.findByIdAndUpdate(
      { _id: id },
      { status: "accepted" }
    );
  }
  async reject({ id }: { id: string }): Promise<IRecruiterRequest | null> {
    return await this.database.findByIdAndUpdate(
      { _id: id },
      { status: "rejected" }
    );
  }

  async delete({ id }: { id: string }): Promise<IRecruiterRequest | null> {
    return await this.database.findByIdAndDelete({ _id: id });
  }

  async pendingRequests({
    id,
    query,
  }: {
    id: string;
    query: {
      p: number;
    };
  }): Promise<IRecruiterRequest[]> {
    const options = {
      page: query.p ?? 1,
      limit: 10,
    };
    const aggregation = this.database.aggregate([
      {
        $match: { company: new ObjectId(id), status: "pending" },
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
    ]);
    return await this.database.aggregatePaginate(aggregation, options);
  }

  async recruitersList({
    id,
    query,
  }: {
    id: string;
    query: {
      p: number;
    };
  }): Promise<IRecruiterRequest[]> {
    const options = {
      page: query?.p ?? 1,
      limit: 10,
    };
    const aggregation = this.database.aggregate([
      {
        $match: { company: new ObjectId(id), status: "accepted" },
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
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
