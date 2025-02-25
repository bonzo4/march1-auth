import { error, t } from "elysia";
import { auth } from "../../auth";
import type { JwtType } from "../types/jwt";
import type { SetType } from "../types/set";
import { validatePhoneNumber } from "../validatePhoneNumber";

export const sendOTPBody = t.Object({
  token: t.String(),
});

type sendOTPOptions = {
  body: typeof sendOTPBody.static;
  jwtAuth: JwtType;
  set: SetType;
  sendPhoneNumberOTP: ({
    body: { phoneNumber },
  }: {
    body: { phoneNumber: string };
  }) => Promise<{ code: string }>;
};

export async function sendOTP({
  jwtAuth,
  set,
  body: { token },
  sendPhoneNumberOTP,
}: sendOTPOptions) {
  const verifiedToken = await jwtAuth.verify(token);
  if (!verifiedToken) {
    set.status = "Unauthorized";
    throw error(set.status);
  }
  if (!verifiedToken.phoneNumber) {
    set.status = "Bad Request";
    throw error(set.status, "Missing Phone Number");
  }
  const { phoneNumber } = verifiedToken as { phoneNumber: string };
  const validatedPhoneNumber = validatePhoneNumber(phoneNumber);
  if (!validatedPhoneNumber) {
    set.status = "Bad Request";
    throw error(set.status, "Invalid phone number");
  }
  await sendPhoneNumberOTP({ body: { phoneNumber } });

  return "Code sent";
}
