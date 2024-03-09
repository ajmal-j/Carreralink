import { Repositories } from "../database/index.js";
import { CreateUserUsecase } from "./createUser.usecase.js";

const createUserUsecase = new CreateUserUsecase(Repositories.UserDataRepo);

export {
    createUserUsecase,
}