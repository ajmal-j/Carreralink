import {
  BadRequestError,
  CustomResponse,
  NotFoundError,
} from "@carreralink/common";
import { Request } from "express";
import { uploadToS3 } from "../../lib/s3Bucket.js";
import { addResumeUsecase } from "../../usecases/index.js";

export default function () {
  return async (req: Request) => {
    const user = req?.user;
    if (!user?.email) throw new BadRequestError("User not authenticated");
    const file = req.file;
    if (!file) throw new NotFoundError("File not found");
    const { name } = req.body;
    if (!name) throw new NotFoundError("Name not found");
    const url = (await uploadToS3(
      file?.mimetype as string,
      file?.buffer as Buffer
    )) as string;

    if (!url) throw new NotFoundError("Url not found");

    const { resume } = await addResumeUsecase.execute({
      email: user.email,
      url,
      name,
    });

    return new CustomResponse()
      .data(resume)
      .statusCode(200)
      .message("Resume added successfully")
      .response();
  };
}
