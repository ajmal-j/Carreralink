import { CustomResponse } from "@carreralink/common";
import { getUsersUsecase } from "../../usecases/index.js";

export default function () {
  return async (req: any) => {
    const adminData = req.adminData;
    if (!adminData.email || !adminData.isAdmin)
      throw new Error("Admin data not found");
    const { q, p } = req.query;
    const query = {
      p: Number(p) ?? 1,
      q: q as string,
    };
    const data = await getUsersUsecase.execute(query);
    return new CustomResponse()
      .data(data)
      .statusCode(200)
      .message("All verified companies.")
      .response();
  };
}
