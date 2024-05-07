import { CustomResponse, NotFoundError } from "@carreralink/common";
import { Request } from "express";
import { isRecruiterUsecase, updateJobUsecase } from "../../usecases/index.js";

export default function () {
  return async (req: Request) => {
    const userData = req.user;
    if (!userData?.email) throw new NotFoundError("Company id not found");

    await isRecruiterUsecase.execute(userData?.email);

    const { data, id } = req.body;

    if (!data) throw new NotFoundError("Job data not found");
    if (!id) throw new NotFoundError("Job id not found");

    const job = await updateJobUsecase.execute(id, data);
    return new CustomResponse()
      .data(job)
      .statusCode(200)
      .message("Job updated")
      .response();
  };
}
