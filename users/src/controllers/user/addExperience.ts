import { CustomResponse, UnauthorizedError } from "@carreralink/common";
import { Request } from "express";
import { addExperienceUsecase } from "../../usecases/index.js";

export default function () {
  return async (req: Request) => {
    const userData = req?.user;
    if (!userData) throw new UnauthorizedError("User not authenticated");
    const data = req.body;
    const email = userData.email;
    const user = await addExperienceUsecase.execute(email, data);
    return new CustomResponse()
      .message("Updated")
      .statusCode(201)
      .data(user)
      .response();
  };
}
