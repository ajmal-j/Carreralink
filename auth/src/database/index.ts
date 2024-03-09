import { UserModel } from "./models/user.model.js";
import { UserRepository } from "./repositories/user.repository.js";

export const Repositories = {
  UserRepo: new UserRepository(UserModel),
};
export type UserRepoType = typeof Repositories.UserRepo;