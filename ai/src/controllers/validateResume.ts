import { CustomResponse, NotFoundError } from "@carreralink/common";
import { Request } from "express";
import { AiUsecases } from "../usecases/index.js";
import { IEventProducer } from "../events/producer/producer.js";

export default function ({ eventProducer }: { eventProducer: IEventProducer }) {
  return async (req: Request) => {
    const userData = req?.user;
    if (!userData || !userData.email)
      throw new NotFoundError("User not authenticated");
    const { resume, description } = req.body;
    if (!resume) throw new NotFoundError("Resume not found");
    if (!description) throw new NotFoundError("Description not found");
    const data = await AiUsecases.validateResumeUsecase.execute({
      description,
      resume,
    });
    await eventProducer.planUsed({
      user: {
        email: userData.email,
      },
    });
    return new CustomResponse().data(data).statusCode(200).response();
  };
}
