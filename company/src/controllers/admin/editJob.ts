import { CustomResponse, NotFoundError } from "@carreralink/common";
import { Request } from "express";
import { updateJobUsecase } from "../../usecases/index.js";

export default function () {
  return async (req: Request) => {
    const { id, values } = req?.body;
    if (!id) throw new NotFoundError("Job id not found");
    if (!values) throw new NotFoundError("Job values not found");
    await updateJobUsecase.execute(id, values);
    return new CustomResponse()
      .message("Job updated")
      .statusCode(200)
      .response();
  };
}
