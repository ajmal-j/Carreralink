import { CustomResponse, NotFoundError } from "@carreralink/common";
import { isVerifiedUsecase } from "../../usecases/index.js";

export default function () {
  return async (req: any) => {
    const data = req.companyData;
    if (!data?.email) throw new NotFoundError("Company id not found");

    const verified = await isVerifiedUsecase.execute(data.email);

    return new CustomResponse()
      .data(verified)
      .statusCode(200)
      .message("All Companies.")
      .response();
  };
}
