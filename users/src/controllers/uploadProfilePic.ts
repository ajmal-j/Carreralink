import { Request } from "express";
import { uploadToS3 } from "../lib/s3Bucket.js";
import {
  BadRequestError,
  CustomResponse,
  NotFoundError,
} from "@carreralink/common";
import { updateProfilePicUsecase } from "../usecases/index.js";

export default function () {
  return async (req: Request) => {
    const user = req?.user;
    if (!user?.email) throw new BadRequestError("User not found");

    const file = req.file;
    if (!file) throw new NotFoundError("File not found");

    const url = (await uploadToS3(
      file?.mimetype as string,
      file?.buffer as Buffer
    )) as string;

    await updateProfilePicUsecase.execute(user.email, url);

    return new CustomResponse()
      .message("Image uploaded")
      .data(url as string)
      .response();
  };
}
