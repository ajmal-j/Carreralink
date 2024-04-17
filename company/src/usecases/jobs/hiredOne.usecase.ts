import { IJobRepoType } from "../../database/index.js";

export class HiredOneUsecase {
  constructor(private readonly JobRepository: IJobRepoType) {}

  async execute({ id }: { id: string }) {
    await this.JobRepository.hiredOne({ id });
  }
}
