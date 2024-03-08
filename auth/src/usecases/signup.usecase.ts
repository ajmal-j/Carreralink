import { IUser, User } from "../entities/user.entity";
import { IPasswordUtil } from "@carreralink/common";

export default (passwordUtil: IPasswordUtil) => {
  return async (user: IUser) => {
    const hashedPassword = await passwordUtil.hashPassword(user.password);

    user.password = hashedPassword;
    return new User(user);
  };
};
