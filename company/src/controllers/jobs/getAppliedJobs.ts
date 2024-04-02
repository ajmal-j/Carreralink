import { BadRequestError, CustomResponse } from "@carreralink/common";
import { Request } from "express";
import { getAppliedJobsUsecase } from "../../usecases/index.js";

export default function () {
  return async (req: Request) => {
    const user = req?.user;
    if (!user?.email) throw new BadRequestError("User not authenticated");
    const { p = 1 } = req.query;
    const query = {
      p: Number(p) ?? 1,
    };
    const jobs = await getAppliedJobsUsecase.execute({
      user: user.email,
      query,
    });
    return new CustomResponse()
      .data(jobs)
      .message("All applied jobs")
      .statusCode(200)
      .response();
  };
}
