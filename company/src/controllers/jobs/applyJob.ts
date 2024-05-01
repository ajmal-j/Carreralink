import { BadRequestError, CustomResponse } from "@carreralink/common";
import { Request } from "express";
import { applyJobUsecase } from "../../usecases/index.js";
import { IEventProducer } from "../../events/producer/producer.js";

export default function ({ eventProducer }: { eventProducer: IEventProducer }) {
  return async (req: Request) => {
    const user = req?.user;
    if (!user?.email) throw new BadRequestError("User not authenticated");
    const { resume, job, description } = req.body;
    if (!resume) throw new BadRequestError("Resume not found");
    if (!job) throw new BadRequestError("Job not found");
    if (!description) throw new BadRequestError("Description not found");

    const applied = await applyJobUsecase.execute({
      job,
      user: user.email,
      resume,
    });

    await eventProducer.jobApplied({
      applied,
      description,
    });
    return new CustomResponse()
      .data(applied)
      .message("Applied successfully")
      .statusCode(200)
      .response();
  };
}
