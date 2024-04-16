import { InterviewModelType } from "../models/interview.model.js";

export class InterviewRepository {
  constructor(private readonly database: InterviewModelType) {}

  async create(data: Record<string, any>) {
    return await this.database.create(data);
  }
}
