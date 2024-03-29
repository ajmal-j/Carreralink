import { ICompanyRepoType } from "../../database/index.js";

export class UpdateCoverPhotoUsecase {
  constructor(private readonly CompanyRepository: ICompanyRepoType) {}

  async execute(email: string, url: string) {
    return await this.CompanyRepository.updateCoverPhoto(email, url);
  }
}
