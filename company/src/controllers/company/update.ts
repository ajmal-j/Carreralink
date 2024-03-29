import { CustomResponse, NotFoundError } from "@carreralink/common";
import { Request } from "express";
import { updateCompanyUsecase } from "../../usecases/index.js";
import { uploadToS3 } from "../../lib/s3buket.js";

export default function () {
  return async (req: Request) => {
    const data = req.companyData;
    const email = data?.email;
    if (!email) throw new NotFoundError("Company id not found");
    const { logo, imageOfCEO, ...companyData } = req.body;
    const file: Record<string, any> | undefined = req.files;

    let updatedLogo = null;
    let updatedImageOfCEO = null;

    if (file) {
      if (file["logo"]) {
        updatedLogo = (await uploadToS3(
          file["logo"][0]?.mimetype as string,
          file["logo"][0]?.buffer as Buffer
        )) as string;
      }
      if (file["imageOfCEO"]) {
        updatedImageOfCEO = await uploadToS3(
          file["imageOfCEO"][0]?.mimetype as string,
          file["imageOfCEO"][0]?.buffer as Buffer
        );
      }
    }
    if (updatedLogo) companyData["logo"] = updatedLogo;
    if (updatedImageOfCEO) companyData["imageOfCEO"] = updatedImageOfCEO;

    if (!companyData) throw new NotFoundError("Company data not found");
    const updatedCompany = await updateCompanyUsecase.execute(
      email,
      companyData
    );

    return new CustomResponse()
      .message("Company updated successfully")
      .statusCode(200)
      .data(updatedCompany)
      .response();
  };
}
