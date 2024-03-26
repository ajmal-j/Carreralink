import {
  BadRequestError,
  CustomError,
  NotFoundError,
} from "@carreralink/common";
import { OtpModelType } from "../models/otp.model.js";

export class OtpRepository {
  constructor(private readonly database: OtpModelType) {}

  async createOtp(record: { email: string; otp: string }) {
    const user = await this.database.findOne({ email: record.email });
    if (user) {
      user.otp = record.otp;
      user.expiresAt = new Date(Date.now() + 5 * 60 * 1000);
      await user.save();
      return user;
    } else return await this.database.create(record);
  }
  async verifyOtp({ email, otp }: { email: string; otp: string }) {
    const otpRecord = await this.database.findOne({ email });
    if (!otpRecord) throw new NotFoundError("Please resent OTP.");
    if (otpRecord.expiresAt < new Date())
      throw new CustomError("OTP expired.", 401);
    if (otpRecord.otp !== otp) throw new BadRequestError("Invalid OTP.");
    return true;
  }
}
