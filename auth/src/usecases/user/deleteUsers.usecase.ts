import { UserRepoType } from "../../database/index.js";

export class DeleteUsersUsecase {
  constructor(private readonly userRepository: UserRepoType) {}

  async execute({ users }: { users: string[] }) {
    return await this.userRepository.deleteUsers(users);
  }
}
