import { mailService } from "@carreralink/common";

export const sendOtp = async ({
  email,
  otp,
}: {
  email: string;
  otp: string;
}) => {
  await mailService({
    email: email,
    message: `Dear ${email},`,
    subject: "CarreraLink account verification",
    html: `<h1>Your OTP is ${otp}</h1>`,
  });
};
