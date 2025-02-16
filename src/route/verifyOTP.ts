import { Elysia, t } from "elysia";
import { verifyOTP } from "../utils/verify";

export const verifyOTPRoute = new Elysia().post(
  "/verifyOTP",
  ({ body: { phoneNumber, code } }) => verifyOTP({ phoneNumber, code }),
  {
    body: t.Object({ phoneNumber: t.String(), code: t.String() }),
  }
);
