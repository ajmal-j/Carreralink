import { CustomResponse, UnauthorizedError } from "@carreralink/common";
import { isRecruiterUsecase } from "../../usecases/index.js";

export default function () {
  return async (req: any) => {
    const user = req?.user;
    if (!user?.email) throw new UnauthorizedError("User not authenticated");

    const data = await isRecruiterUsecase.execute(user.email);

    return new CustomResponse()
      .data(data && data)
      .message("User authenticated")
      .statusCode(200)
      .response();
  };
}
