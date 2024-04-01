import { CustomResponse, NotFoundError } from "@carreralink/common";
import { Request } from "express";
import { createJobByRecruiterUsecase } from "../../usecases/index.js";

export default function () {
  return async (req: Request) => {
    const userData = req?.user;
    if (!userData?.email) throw new NotFoundError("User not found");
    const { id, data } = req.body;
    if (!id) throw new NotFoundError("Company id not found");
    if (!data) throw new NotFoundError("Job data not found");
    const job = await createJobByRecruiterUsecase.execute({
      email: userData.email,
      id,
      jobData: data,
    });
    return new CustomResponse()
      .data(job)
      .statusCode(200)
      .message("Job created")
      .response();
  };
}
