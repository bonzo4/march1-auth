import { Elysia, t } from "elysia";
import { sendOTP } from "../utils/sendOTP";

export const sendOTPRoute = new Elysia().post(
  "/sendOTP",
  ({ body: { phoneNumber } }) => sendOTP(phoneNumber),
  {
    body: t.Object({ phoneNumber: t.String() }),
  }
);
