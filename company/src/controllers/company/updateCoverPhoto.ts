import { CustomResponse, NotFoundError } from "@carreralink/common";
import { Request } from "express";
import { uploadToS3 } from "../../lib/s3buket.js";
import { updateCoverPhotoUsecase } from "../../usecases/index.js";

export default function () {
  return async (req: Request) => {
    const { email } = req.companyData;
    if (!email) throw new NotFoundError("Company id not found");
    const file = req.file;
    if (!file) throw new NotFoundError("File not found");
    const url = (await uploadToS3(
      file?.mimetype as string,
      file?.buffer as Buffer
    )) as string;
    if (!url) throw new NotFoundError("Url not found");
    await updateCoverPhotoUsecase.execute(email, url);
    return new CustomResponse()
      .data(url)
      .statusCode(200)
      .message("Cover Photo updated successfully")
      .response();
  };
}
