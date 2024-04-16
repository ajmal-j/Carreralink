import { Repositories } from "../../database/index.js";
import { CancelUsecase } from "./cancel.usecase.js";
import { CreateUsecase } from "./create.usecase.js";
import { GetByUser } from "./getByUser.usecase.js";

const create = new CreateUsecase(Repositories.InterviewRepository);
const getByUser = new GetByUser(Repositories.InterviewRepository);
const cancel = new CancelUsecase(Repositories.InterviewRepository);

export const InterviewUsecase = { create, getByUser, cancel };
