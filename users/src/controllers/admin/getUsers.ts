import { CustomResponse } from "@carreralink/common";
import { getUsersUsecase } from "../../usecases/index.js";

export default function () {
  return async (req: any) => {
    const adminData = req.adminData;
    if (!adminData.email || !adminData.isAdmin)
      throw new Error("Admin data not found");
    const q = req.query;
    const query = {
      p: Number(q?.p) ?? 1,
    };
    const data = await getUsersUsecase.execute(query);
    return (
      new CustomResponse()
        .data(data)
        .statusCode(200)
        .message("All verified companies.")
        .response()
    );
  };
}
