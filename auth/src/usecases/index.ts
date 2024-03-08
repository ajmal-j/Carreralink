import { passwordUtil } from "@carreralink/common";
import buildSignup from "./signup.usecase";

const signupUseCase = buildSignup(passwordUtil);

export { signupUseCase };
