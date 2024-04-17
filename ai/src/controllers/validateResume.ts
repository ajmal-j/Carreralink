import { CustomResponse, NotFoundError } from "@carreralink/common";
import { Request } from "express";
import { AiUsecases } from "../usecases/index.js";

export default function () {
  return async (req: Request) => {
    const { resume, description } = req.body;
    if (!resume) throw new NotFoundError("Resume not found");
    if (!description) throw new NotFoundError("Description not found");
    const data = await AiUsecases.validateResumeUsecase.execute({
      description,
      resume,
    });
    return new CustomResponse().data(data).statusCode(200).response();
  };
}
