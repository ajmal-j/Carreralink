import { CustomResponse, UnauthorizedError } from "@carreralink/common";
import { Request } from "express";
import { verifiedCompaniesUsecase } from "../../usecases/index.js";

declare module "express" {
  export interface Request {
    adminData: {
      email: string | undefined;
      id: string | undefined;
      isAdmin: boolean;
    };
  }
}

export default function () {
  return async (req: Request) => {
    const adminData = req.adminData;
    if (!adminData.email || !adminData.isAdmin)
      throw new UnauthorizedError("Admin data not found");
    const q = req.query;
    const query = {
      p: Number(q.p) ?? 1,
    };
    const data = await verifiedCompaniesUsecase.execute(query);
    return new CustomResponse()
      .data(data)
      .statusCode(200)
      .message("All verified companies.")
      .response();
  };
}
