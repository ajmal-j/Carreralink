import { BadRequestError, CustomResponse } from "@carreralink/common";
import { Request } from "express";
import { JobUsecase } from "../../usecases/jobs/index.js";
import { IEventProducer } from "../../events/producer/producer.js";

export default function (eventProducer: IEventProducer) {
  return async (req: Request) => {
    const { assessments, job, expectedAnswers, description } = req.body;
    const userData = req?.user;
    if (!assessments) throw new BadRequestError("Assessments not found");
    if (!job) throw new BadRequestError("Job not found");
    if (!userData?.email) throw new BadRequestError("User not authenticated");
    if (!description) throw new BadRequestError("Description not found");
    if (!expectedAnswers)
      throw new BadRequestError("Expected answers not found");

    await JobUsecase.updateApplicationAssessment.execute({
      assessments,
      job,
      user: userData.email,
    });

    await eventProducer.assessmentAdded({
      assessments,
      job,
      user: userData.email,
      expectedAnswers,
      description,
    });
    return new CustomResponse()
      .message("Assessment updated")
      .statusCode(200)
      .response();
  };
}
