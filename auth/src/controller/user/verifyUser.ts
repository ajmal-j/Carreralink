import { Request } from "express";
import { IEventProducer } from "../../events/producer.js";
import { CustomResponse, NotFoundError } from "@carreralink/common";
import { verifyOtpUsecase } from "../../usecases/index.js";

export default function ({ eventProducer }: { eventProducer: IEventProducer }) {
  return async (req: Request) => {
    const { email, otp } = req?.body;
    if (!email || !otp) throw new NotFoundError("Email and otp are required");

    const updatedUser = await verifyOtpUsecase.execute({ email, otp });
    await eventProducer.userCreated(updatedUser);
    return new CustomResponse().message("OTP verified successfully").response();
  };
}
