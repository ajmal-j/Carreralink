import { CompanyLogInUseCase } from "../../usecases/index.js";
import { ILogInSchema } from "../../utils/validator.util.js";
import { CustomResponse, generateToken } from "@carreralink/common";

export const buildCompanyLogin = (logInSchema: ILogInSchema) => {
  return async (req: Request) => {
    const companyData = logInSchema.parse(req.body);
    const company = await CompanyLogInUseCase.execute({ ...companyData });

    const token = generateToken(company);

    return new CustomResponse()
      .message("Login successful")
      .cookie("companyToken", token, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      .data({ token, ...company })
      .response();
  };
};
