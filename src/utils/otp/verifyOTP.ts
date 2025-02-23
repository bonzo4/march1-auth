import { error, t } from "elysia";
import { auth } from "../../auth";
import type { JwtType } from "../types/jwt";
import type { SetType } from "../types/set";
import type { UserWithPhoneNumber } from "better-auth/plugins";

export const verifyOTPBody = t.Object({
  token: t.String(),
});

type VerifyPhoneNumberRes =
  | {
      status: boolean;
      token: string;
      user: UserWithPhoneNumber;
    }
  | {
      status: boolean;
      token: null;
      user: UserWithPhoneNumber;
    }
  | null;

type VerifyOTPOptions = {
  body: typeof verifyOTPBody.static;
  set: SetType;
  jwtAuth: JwtType;
  verifyPhoneNumber: ({
    body: { phoneNumber, code },
  }: {
    body: { phoneNumber: string; code: string };
  }) => Promise<VerifyPhoneNumberRes>;
};

export async function verifyOTP({
  jwtAuth,
  set,
  body: { token },
  verifyPhoneNumber,
}: VerifyOTPOptions) {
  const verifiedToken = await jwtAuth.verify(token);
  if (!verifiedToken) {
    set.status = "Unauthorized";
    throw error(set.status);
  }
  if (!verifiedToken.phoneNumber) {
    set.status = "Bad Request";
    throw error(set.status, "Missing Phone Number");
  }
  if (!verifiedToken.code) {
    set.status = "Bad Request";
    throw error(set.status, "Missing Code");
  }
  const { phoneNumber, code } = verifiedToken as {
    phoneNumber: string;
    code: string;
  };

  const verifiedRes = await verifyPhoneNumber({
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
