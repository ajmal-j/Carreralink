import { IUserDataRepo } from "../database/index.js";

export class GoogleLoginUsecase {
  constructor(private readonly UserDataRepo: IUserDataRepo) {}

  async execute(data: any) {
    const { email, picture } = data;
    console.log(email, picture);
    if (email && picture) {
      this.UserDataRepo.updateProfilePic(email, picture);
    }
  }
}
