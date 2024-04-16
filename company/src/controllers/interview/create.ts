import {
  BadRequestError,
  CustomError,
  CustomResponse
} from "@carreralink/common";
import { Request } from "express";
import { InterviewValidationSchema } from "../../lib/schema.js";
import {
  getUserDataByIdUsecase,
  isRecruiterUsecase,
  updateApplicantStatusUsecase,
} from "../../usecases/index.js";
import { InterviewUsecase } from "../../usecases/interview/index.js";

export default function () {
  return async (req: Request) => {
    const user = req?.user;
    const body = req.body;
    const interviewer = await isRecruiterUsecase.execute(user?.email as string);
    const data = {
      ...body,
      interviewer: interviewer?.user?._id.toString(),
      status: "scheduled",
    };
    try {
      const parsedData = InterviewValidationSchema.parse(data);
      const user = await getUserDataByIdUsecase.execute(parsedData.applicant);
      await updateApplicantStatusUsecase.execute({
        job: parsedData.job,
        status: "interview",
        user: user.email,
      });
      await InterviewUsecase.create.execute(parsedData);
    } catch (error) {
      console.log(error);
      if (error instanceof CustomError) {
        throw new BadRequestError(error.message);
      }
      throw new BadRequestError("Invalid data");
    }
    return new CustomResponse()
      .message("Interview created")
      .statusCode(201)
      .response();
  };
}
