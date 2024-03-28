import { CustomResponse } from "@carreralink/common";
import { companyListUsecase } from "../../usecases/index.js";

export default function () {
  return async (req: any) => {
    const { q } = req.query;
    if (!q)
      return new CustomResponse()
        .statusCode(400)
        .data([])
        .message("Company name is required")
        .response();
    const data = await companyListUsecase.execute(q);
    return new CustomResponse()
      .data(data)
      .statusCode(200)
      .message("All Companies.")
      .response();
  };
}
