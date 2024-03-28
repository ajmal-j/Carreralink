import { CustomResponse, NotFoundError } from "@carreralink/common";
import { getUserUsecase } from "../../usecases/index.js";

export default function () {
  return async (req: any) => {
    const { username } = req.query;
    if (!username) throw new NotFoundError("Username not found");
    const user = await getUserUsecase.execute({
      username: decodeURIComponent(username),
    });
    return new CustomResponse()
      .data(user as {})
      .statusCode(200)
      .response();
  };
}
