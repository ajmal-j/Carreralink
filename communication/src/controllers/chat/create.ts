import { BadRequestError, CustomResponse } from "@carreralink/common";
import { Request } from "express";
import { UserUsecases } from "../../usecases/user/index.js";
import { ChatUsecase } from "../../usecases/chat/index.js";

export default function () {
  return async (req: Request) => {
    const userData = req?.user;
    const { user, company } = req.body;
    if (!userData) throw new BadRequestError("User not authenticated");
    if (!company) throw new BadRequestError("Company not found");

    const [recruiterData, candidateData] = await Promise.all([
      UserUsecases.getByEmail.execute({
        email: userData.email,
      }),
      UserUsecases.getByEmail.execute({
        email: user,
      }),
    ]);

    const data = await ChatUsecase.create.execute({
      participants: {
        user: candidateData?._id.toString(),
        company: company,
        recruiter: recruiterData?._id.toString(),
      },
    });
    const id = (await data?._id.toString()) ?? data.id;

    return new CustomResponse()
      .message("Chat created")
      .data({ id })
      .statusCode(201)
      .response();
  };
}
