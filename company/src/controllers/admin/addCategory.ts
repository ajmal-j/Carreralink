import { CustomResponse } from "@carreralink/common";
import { addCategoryUsecase } from "../../usecases/index.js";

export default function () {
  return async (req: any) => {
    const { categories } = req.body;
    if (!categories) throw new Error("category not found");
    await addCategoryUsecase.execute(categories);
    return new CustomResponse()
      .statusCode(200)
      .message("Categories added")
      .response();
  };
}
