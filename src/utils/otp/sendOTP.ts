import { t } from "elysia";
import { auth } from "../../auth";
import type { JwtType } from "../jwt";

export const sendOTPBody = t.Object({
  token: t.String(),
});

type sendOTPOptions = {
  body: typeof sendOTPBody.static;
  authJwt: JwtType;
};

export async function sendOTP({ authJwt, body: { token } }: sendOTPOptions) {
  const verifiedToken = await authJwt.verify(token);
  if (!verifiedToken) {
    throw new Error("Restricted");
  }
  const { phoneNumber } = verifiedToken as { phoneNumber: string };
  const code = await auth.api.sendPhoneNumberOTP({
    body: {
      phoneNumber,
    },
  });

  return code;
}
