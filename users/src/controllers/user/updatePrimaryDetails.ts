import { CustomResponse, UnauthorizedError } from "@carreralink/common";
import { Request } from "express";
import { updateProfileUsecase } from "../../usecases/index.js";
import { IEventProducer } from "../../events/producer/producer.js";

export default function (eventProducer: IEventProducer) {
  return async (req: Request) => {
    const userData = req?.user;
    if (!userData) throw new UnauthorizedError("User not authenticated");
    const data = req.body;
    const email = userData.email;
    const user = await updateProfileUsecase.execute(email, data);
    await eventProducer.updatedUser({
      user: {
        email: user.email,
        username: user.username,
        profile: user.profile,
      },
    });
    return new CustomResponse()
      .message("Updated")
      .statusCode(201)
      .data(user)
      .response();
  };
}
