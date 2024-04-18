import { CustomResponse } from "@carreralink/common";
import { Request } from "express";

export default function () {
  return async (req: Request) => {
    const user = req?.user;
    console.log(user);
    return new CustomResponse().message("Chats").statusCode(200).response();
  };
}
