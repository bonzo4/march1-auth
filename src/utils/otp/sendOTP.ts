import { error, t } from "elysia";
import { auth } from "../../auth";
import type { JwtType } from "../types/jwt";

export const sendOTPBody = t.Object({
  token: t.String(),
});

type sendOTPOptions = {
  body: typeof sendOTPBody.static;
  jwtAuth: JwtType;
};

export async function sendOTP({ jwtAuth, body: { token } }: sendOTPOptions) {
  const verifiedToken = await jwtAuth.verify(token);
  if (!verifiedToken) {
    throw error("Unauthorized");
  }
  if (!verifiedToken.phoneNumber || !verifiedToken.code) {
    throw error("No Content");
  }
  const { phoneNumber } = verifiedToken as { phoneNumber: string };
  const code = await auth.api.sendPhoneNumberOTP({
    body: {
      phoneNumber,
    },
  });

  return "Code sent";
}
