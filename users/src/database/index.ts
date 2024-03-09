import { UserDataModel } from "./models/userData.model";
import { UserDataRepository } from "./repository/userData.repo";

export const Repositories = {
  UserDataRepo: new UserDataRepository(UserDataModel),
};

export type IUserDataRepo = typeof Repositories.UserDataRepo;
