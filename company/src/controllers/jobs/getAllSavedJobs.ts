import {
  BadRequestError,
  CustomResponse,
  NotFoundError,
} from "@carreralink/common";
import { Request } from "express";
import {
  getAllSavedJobsUsecase,
  saveJobUsecase,
} from "../../usecases/index.js";

export default function () {
  return async (req: Request) => {
    const user = req?.user;
    if (!user?.email) throw new BadRequestError("User not authenticated");
    const { p = 1 } = req.query;
    const query = {
      p: Number(p) ?? 1,
    };
    const jobs = await getAllSavedJobsUsecase.execute({
      email: user.email,
      query,
    });
    return new CustomResponse()
      .data(jobs)
      .message("All saved jobs")
      .statusCode(200)
      .response();
  };
}
