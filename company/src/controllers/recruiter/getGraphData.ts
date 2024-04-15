import { BadRequestError, CustomResponse } from "@carreralink/common";
import { Request } from "express";
import {
  isRecruiterUsecase,
  recruiterMonthlyGraphDataUsecase,
  recruiterYearlyGraphDataUsecase,
} from "../../usecases/index.js";

export default function () {
  return async (req: Request) => {
    const { filter } = req.query;
    const user = req?.user;
    if (!user?.email) throw new BadRequestError("User not authenticated");
    const exist = await isRecruiterUsecase.execute(user.email);
    if (!exist) throw new BadRequestError("User not a recruiter");
    let data = {};
    if (filter === "yearly") {
      data = await recruiterYearlyGraphDataUsecase.execute({
        userId: exist.user._id.toString(),
        companyId: exist.company._id.toString(),
      });
    } else {
      data = await recruiterMonthlyGraphDataUsecase.execute({
        userId: exist.user._id.toString(),
        companyId: exist.company._id.toString(),
      });
    }
    return new CustomResponse().data(data).statusCode(200).response();
  };
}
