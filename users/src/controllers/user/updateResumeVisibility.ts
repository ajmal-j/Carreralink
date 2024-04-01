import {
  BadRequestError,
  CustomResponse,
  NotFoundError,
} from "@carreralink/common";
import { updateResumeVisibilityUsecase } from "../../usecases/index.js";
import { Request } from "express";

export default function () {
  return async (req: Request) => {
    const user = req.user;
    if (!user?.email) throw new BadRequestError("User not authenticated");
    const { visibility } = req.body;
    if (!visibility && typeof visibility !== "boolean")
      throw new NotFoundError("Visibility not found");
    const { resume } = await updateResumeVisibilityUsecase.execute(
      user.email,
      visibility
    );
    return new CustomResponse()
      .message("Resume removed")
      .data(resume)
      .statusCode(200)
      .response();
  };
}
