import { Request } from "express";
import { rejectCompanyUsecase } from "../../usecases/index.js";
import { CustomResponse } from "@carreralink/common";
import { IEventProducer } from "../../events/producer/producer.js";

export default function (eventProducer: IEventProducer) {
  return async (req: Request) => {
    const { id } = req.query;
    if (!id) throw new Error("Company id not found");
    const company = await rejectCompanyUsecase.execute(id as string);
    await eventProducer.rejectCompany({ email: company.email });
    return new CustomResponse()
      .statusCode(200)
      .message("Rejected Company.")
      .response();
  };
}
