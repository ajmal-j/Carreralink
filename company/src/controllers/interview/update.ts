import {
  BadRequestError,
  CustomError,
  CustomResponse,
} from "@carreralink/common";
import { Request } from "express";
import { InterviewUpdateValidationSchema } from "../../lib/schema.js";
import { isRecruiterUsecase } from "../../usecases/index.js";
import { InterviewUsecase } from "../../usecases/interview/index.js";

export default function () {
  return async (req: Request) => {
    const body = req.body;
    const user = req?.user;
    if (!body.interview) throw new BadRequestError("Interview id not found");
    try {
      const data = InterviewUpdateValidationSchema.parse(body);
      const recruiterData = await isRecruiterUsecase.execute(user?.email);

      await InterviewUsecase.update.execute({
        ...data,
        interviewer: recruiterData?.user?._id.toString(),
      });
    } catch (error) {
      console.log(error);
      if (error instanceof CustomError) {
        throw new BadRequestError(error.message);
      }
      throw new BadRequestError("Invalid data");
    }
    return new CustomResponse()
      .message("Interview updated")
      .statusCode(200)
      .response();
  };
}
