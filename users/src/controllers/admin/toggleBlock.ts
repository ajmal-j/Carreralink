import { CustomResponse, NotFoundError } from "@carreralink/common";
import { toggleBlockUsecase } from "../../usecases/index.js";
import { IEventProducer } from "../../events/producer.js";

export default function (eventProducer: IEventProducer) {
  return async (req: any) => {
    const { email } = req.body;
    if (!email) throw new NotFoundError("Email is not found!");
    const user = await toggleBlockUsecase.execute(email);
    await eventProducer.updateBlock({ email, isBlocked: user.isBlocked });
    return new CustomResponse().message("Updated").statusCode(201).response();
  };
}
