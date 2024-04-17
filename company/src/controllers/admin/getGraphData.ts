import { CustomResponse } from "@carreralink/common";
import { Request } from "express";
import {
    adminMonthlyGraphDataUsecase,
    adminYearlyGraphDataUsecase
} from "../../usecases/index.js";

export default function () {
  return async (req: Request) => {
    const { filter } = req.query;
    let data = {};
    if (filter === "yearly") {
      data = await adminYearlyGraphDataUsecase.execute();
    } else {
      data = await adminMonthlyGraphDataUsecase.execute();
    }
    return new CustomResponse().data(data).statusCode(200).response();
  };
}
