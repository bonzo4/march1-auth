import { error, t } from "elysia";
import { auth } from "../../auth";
import type { JwtType } from "../types/jwt";
import type { SetType } from "../types/set";

export const verifyOTPBody = t.Object({
  token: t.String(),
});

type VerifyOTPOptions = {
  body: typeof verifyOTPBody.static;
  set: SetType;
  jwtAuth: JwtType;
};

export async function verifyOTP({
  jwtAuth,
  set,
  body: { token },
}: VerifyOTPOptions) {
  const verifiedToken = await jwtAuth.verify(token);
  if (!verifiedToken) {
    set.status = "Unauthorized";
    throw error(set.status);
  }
  if (!verifiedToken.phoneNumber || !verifiedToken.code) {
    set.status = "Bad Request";
    throw error(set.status);
  }
  const { phoneNumber, code } = verifiedToken as {
    phoneNumber: string;
    code: string;
  };

  const verifiedRes = await auth.api.verifyPhoneNumber({
    body: {
      phoneNumber,
      code,
    },
  });

  if (!verifiedRes || !verifiedRes.status || !verifiedRes.token) {
    set.status = "Bad Request";
    throw error(set.status);
  }

  return verifiedRes;
}
