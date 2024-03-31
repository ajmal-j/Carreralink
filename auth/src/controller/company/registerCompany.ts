import { CustomResponse, NotFoundError } from "@carreralink/common";
import { IEventProducer } from "../../events/producers/producer.js";
import { createCompanyUsecase } from "../../usecases/index.js";
import { ICreateCompanySchema } from "../../utils/validator.util.js";

export const buildRegister = (
  eventProducer: IEventProducer,
  createCompanySchema: ICreateCompanySchema
) => {
  return async ({ body }: Request) => {
    const data = createCompanySchema.parse(body);
    if (!body) throw new NotFoundError("Company data not found");

    eventProducer.companyCreated(body);

    const company = await createCompanyUsecase.execute(data);
    return new CustomResponse()
      .message("Company created successfully")
      .data(company)
      .response();
  };
};
