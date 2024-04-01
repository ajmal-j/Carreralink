import { BadRequestError, CustomResponse } from "@carreralink/common";
import { Request } from "express";
import { getRecruiterJobsUsecase } from "../../usecases/index.js";

export default function () {
  return async (req: Request) => {
    const { p = 1, q } = req.query;
    const query = {
      page: Number(p) ?? 1,
      q: q as string,
    };
    const user = req?.user;
    if (!user?.email) throw new BadRequestError("User not authenticated");
    const jobs = await getRecruiterJobsUsecase.execute({
      email: user.email,
      query,
    });
    console.log(jobs, "------------------>");
    return new CustomResponse()
      .data(jobs)
      .message("All Jobs.")
      .statusCode(200)
      .response();
  };
}
