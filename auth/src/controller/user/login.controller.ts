import { logInUseCase } from "../../usecases/index.js";
import { ILogInSchema } from "../../utils/validator.util.js";
import { CustomResponse, generateToken } from "@carreralink/common";

export const buildLogIn = (logInSchema: ILogInSchema) => {
  return async (req: Request) => {
    const userData = logInSchema.parse(req.body);

    const user = await logInUseCase.execute({ ...userData });

    const token = generateToken(user);

    return new CustomResponse()
      .message("Login successful")
      .cookie("userToken", token, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      .data({ token, ...user })
      .response();
  };
};
