import { CustomResponse, NotFoundError } from "@carreralink/common";
import { Request } from "express";
import { deleteJobsByAdminUsecase } from "../../usecases/index.js";

export default function () {
  return async (req: Request) => {
    const { jobs } = req.body;
    if (!jobs) throw new NotFoundError("Jobs data not found");
    await deleteJobsByAdminUsecase.execute({ jobs });
    return new CustomResponse()
      .statusCode(200)
      .message("Jobs deleted")
      .response();
  };
}
