import { UserModel } from "./models/user.model";
import { UserRepository } from "./repositories/user.repository";

export const Repositories = {
  UserRepo: new UserRepository(UserModel),
};
export type UserRepoType = typeof Repositories.UserRepo;