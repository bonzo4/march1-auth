import { auth } from "../auth";

type VerifyOTPOptions = {
  phoneNumber: string;
  code: string;
};

export async function verifyOTP({ phoneNumber, code }: VerifyOTPOptions) {
  const isVerified = await auth.api.verifyPhoneNumber({
    body: {
      phoneNumber,
      code,
    },
  });

  return isVerified;
}
