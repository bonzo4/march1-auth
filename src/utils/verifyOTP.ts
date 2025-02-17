import { auth } from "../auth";
import { twilioVerifyOTP } from "./twilio";

type VerifyOTPOptions = {
  phoneNumber: string;
  code: string;
};

export async function verifyOTP({ phoneNumber, code }: VerifyOTPOptions) {
  const status = await twilioVerifyOTP({ phoneNumber, code });
  if (status !== "approved") {
    throw new Error("OTP not approved.");
  }
  const isVerified = await auth.api.verifyPhoneNumber({
    body: {
      phoneNumber,
      code,
    },
  });

  return isVerified;
}
