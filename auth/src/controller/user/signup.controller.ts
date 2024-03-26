import { signupUseCase } from "../../usecases/index.js";
import { ISignUpSchema } from "../../utils/validator.util.js";
import { CustomResponse } from "@carreralink/common";

export const buildSignUp = (signUpSchema: ISignUpSchema) => {
  return async ({ body }: Request) => {
    const userData = signUpSchema.parse(body);

    const user = await signupUseCase.execute({ ...userData, role: "user" });

    return new CustomResponse()
      .message("Please verify your email")
      .data(user)
      .response();
  };
};
