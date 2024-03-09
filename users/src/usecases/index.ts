import { Repositories } from "../database";
import { CreateUserUsecase } from "./createUser.usecase";

const createUserUsecase = new CreateUserUsecase(Repositories.UserDataRepo);

export {
    createUserUsecase,
}