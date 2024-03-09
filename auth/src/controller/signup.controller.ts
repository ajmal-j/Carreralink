import { UserRepoType } from "../database/index.js";
import { signupUseCase } from "../usecases/index.js";
import { IUser } from "../entities/user.entity.js";
import { ISignUpSchema } from "../utils/validator.util.js";
import { CustomError, CustomResponse } from "@carreralink/common";
import { IEventProducer } from "../events/producer.js";

export const buildSignUp = (
  signUpSchema: ISignUpSchema,
  eventProducer: IEventProducer
) => {
  return async ({ body }: Request) => {
    const userData = signUpSchema.parse(body);

    // const isAlreadyTaken = await userRepository.isAlreadyTaken(userData);
    // console.log(isAlreadyTaken);

    const user = await signupUseCase.execute({ ...userData, role: "user" });
    eventProducer.userCreated(user);
    
    return new CustomResponse()
      .message("User created successfully")
      .data(user)
      .response();
  };
};
