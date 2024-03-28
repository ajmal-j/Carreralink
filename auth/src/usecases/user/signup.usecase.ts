import { OtpRepoType, UserRepoType } from "../../database/index.js";
import { IUser, User } from "../../entities/user.entity.js";
import { CustomError, IPasswordUtil } from "@carreralink/common";
import { generateOtp } from "../../utils/generateOtp.js";

export class SignUpUsecase {
  constructor(
    private readonly passwordUtil: IPasswordUtil,
    private readonly userRepository: UserRepoType,
    private readonly OtpRepository: OtpRepoType,
    private readonly sendOtp: ({
      email,
      otp,
    }: {
      email: string;
      otp: string;
    }) => Promise<void>
  ) {}

  async execute(userData: IUser) {
    const isAlreadyTaken = await this.userRepository.isAlreadyTaken(userData);
    if (isAlreadyTaken)
      throw new CustomError(
        `${
          isAlreadyTaken.email === userData.email
            ? "Email"
            : isAlreadyTaken.username === userData.username
            ? "Username"
            : "Contact"
        } is already taken.`,
        409
      );
    const otp = generateOtp();
    await this.sendOtp({ otp, email: userData.email });
    await this.OtpRepository.createOtp({
      email: userData.email,
      otp,
    });
    const hashedPassword = await this.passwordUtil.hashPassword(
      userData.password
    );
    userData.password = hashedPassword;
    const user = new User(userData);
    this.userRepository.createUser(user);
    return user;
  }
}
