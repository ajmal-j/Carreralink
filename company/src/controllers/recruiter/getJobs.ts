import { BadRequestError, CustomResponse } from "@carreralink/common";
import { Request } from "express";
import {
  getRecruiterJobsUsecase,
  isRecruiterUsecase,
} from "../../usecases/index.js";

export default function () {
  return async (req: Request) => {
    const { p = 1, q } = req.query;
    const query = {
      page: Number(p) ?? 1,
      q: q as string,
    };
    const user = req?.user;
    if (!user?.email) throw new BadRequestError("User not authenticated");
    const exist = await isRecruiterUsecase.execute(user.email);
    if (!exist) throw new BadRequestError("User not a recruiter");
    const jobs = await getRecruiterJobsUsecase.execute({
      email: user.email,
      query,
      companyId: exist.company._id.toString(),
    });
    return new CustomResponse()
      .data(jobs)
      .message("All Jobs.")
      .statusCode(200)
      .response();
  };
}
