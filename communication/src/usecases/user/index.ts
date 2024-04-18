import { Repositories } from "../../database/index.js";
import { CreateUserUsecase } from "./create.usecase.js";
import { GetUserDataByEmailUsecase } from "./getUserDataByEmail.usecase.js";
import { UpdateUserUsecase } from "./update.usecase.js";

const create = new CreateUserUsecase(Repositories.userRepository);
const update = new UpdateUserUsecase(Repositories.userRepository);
const getByEmail = new GetUserDataByEmailUsecase(Repositories.userRepository);

export const UserUsecases = {
  create,
  update,
  getByEmail,
} as const;

export type IUserUsecase = typeof UserUsecases;
