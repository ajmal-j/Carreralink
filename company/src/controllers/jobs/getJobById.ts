import { CustomResponse, NotFoundError } from "@carreralink/common";
import { getJobByIdUsecase } from "../../usecases/index.js";

export default function () {
  return async (req: any) => {
    const { id } = req.query;
    if (!id) throw new NotFoundError("Job id not found");
    const data = await getJobByIdUsecase.execute(id as string);
    if (!data) throw new NotFoundError("Wrong Jobs Id.");
    return new CustomResponse()
      .data(data)
      .statusCode(200)
      .message("All Jobs.")
      .response();
  };
}
