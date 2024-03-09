import { UserRepoType } from "../database";
import { signupUseCase } from "../usecases";
import { IUser } from "../entities/user.entity";
import { ISignUpSchema } from "../utils/validator.util";
import { CustomError, CustomResponse } from "@carreralink/common";

export default (userRepository: UserRepoType, signUpSchema: ISignUpSchema) => {
  return async ({ body }: Request) => {
    const userData = signUpSchema.parse(body);

    // const isAlreadyTaken = await userRepository.isAlreadyTaken(userData);
    // console.log(isAlreadyTaken);

    const user = await signupUseCase({ ...userData, role: "user" });
    
    return new CustomResponse()
      .message("User created successfully")
      .data(user)
      .response();
  };
};
