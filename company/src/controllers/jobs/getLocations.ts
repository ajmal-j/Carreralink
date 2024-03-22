import { CustomResponse } from "@carreralink/common";
import { getLocationsUsecase } from "../../usecases/index.js";

export default function () {
  return async (req: any) => {
    const data = await getLocationsUsecase.execute();
    return new CustomResponse()
      .data(data)
      .statusCode(200)
      .message("All Locations.")
      .response();
  };
}
