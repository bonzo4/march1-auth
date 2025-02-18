import { t } from "elysia";
import { auth } from "../../auth";
import { twilioVerifyOTP } from "./twilio";
import type { JwtType } from "../jwt";

export const verifyOTPBody = t.Object({
  token: t.String(),
});

type VerifyOTPOptions = {
  body: typeof verifyOTPBody.static;
  authJwt: JwtType;
};

export async function verifyOTP({
  authJwt,
  body: { token },
}: VerifyOTPOptions) {
  const verifiedToken = await authJwt.verify(token);
  if (!verifiedToken) {
    throw new Error("Restricted");
  }
  const { phoneNumber, code } = verifiedToken as {
    phoneNumber: string;
    code: string;
  };
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
