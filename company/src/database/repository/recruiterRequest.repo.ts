import { CustomError } from "@carreralink/common";
import {
  IRecruiterRequest,
  IRecruiterRequestModel,
} from "../models/recruiterRequest.model.js";

export class RecruiterRequestRepository {
  constructor(private readonly database: IRecruiterRequestModel) {}

  async create(data: Record<string, any>): Promise<IRecruiterRequest> {
    const exist = await this.database.findOne({
      $and: [{ user: data.user }, { company: data.company }],
    });
    if (exist) throw new CustomError("Request already submitted.", 409);
    else return await this.database.create(data);
  }
  async isRecruiter(email: string): Promise<IRecruiterRequest | null> {
    return await this.database.findOne({
      $and: [{ user: email }, { status: "accepted" }],
    });
  }

  async pendingRequests(email: string): Promise<IRecruiterRequest[]> {
    return await this.database.find({ company: email, status: "pending" });
  }

  async recruiterList(email: string): Promise<IRecruiterRequest[]> {
    return await this.database.find({ company: email, status: "accepted" });
  }
}
