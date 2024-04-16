import { Repositories } from "../../database/index.js";
import { CreateInterviewUsecase } from "./create.usecase.js";

const create = new CreateInterviewUsecase(Repositories.InterviewRepository);

export const InterviewUsecase = { create };
