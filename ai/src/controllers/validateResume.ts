import { CustomResponse } from "@carreralink/common";
import { Request } from "express";

export default function () {
  return async (req: Request) => {
    const { resume, description } = req.body;
    console.log(resume, description);
    return new CustomResponse().data("").statusCode(200).response();
  };
}
