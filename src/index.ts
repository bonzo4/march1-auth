import { Elysia } from "elysia";
import jwt from "@elysiajs/jwt";
import { sendOTP, sendOTPBody } from "./utils/otp/sendOTP";
import { verifyOTP, verifyOTPBody } from "./utils/otp/verifyOTP";
import { onBeforeHandle } from "./utils/onBeforeHandle";
import { auth } from "./auth";
import { treaty } from "@elysiajs/eden";
import type { users } from "./db/schema/users";

export const authApi = new Elysia()
  .use(
    jwt({
      name: "jwtAuth",
      secret: process.env.AUTH_JWT_SECRET!,
    })
  )
  .onBeforeHandle(onBeforeHandle)
  .post(
    "/sendOTP",
    ({ jwtAuth, body, set }) =>
      sendOTP({
        jwtAuth,
        body,
        set,
        sendPhoneNumberOTP: auth.api.sendPhoneNumberOTP,
      }),
    { body: sendOTPBody }
  )
  .post(
    "/verifyOTP",
    ({ jwtAuth, body, set }) =>
      verifyOTP({
        jwtAuth,
        body,
        set,
        verifyPhoneNumber: auth.api.verifyPhoneNumber,
      }),
    {
      body: verifyOTPBody,
    }
  )
  .listen(process.env.PORT!);

type AuthApi = typeof authApi;
const authTreaty = treaty<AuthApi>("");
type SendOTPRoute = (typeof authTreaty)["sendOTP"]["post"];
type VerifyOTPRoute = (typeof authTreaty)["verifyOTP"]["post"];
export { users, sessions, verifications, accounts } from "./db";
export type { AuthApi, SendOTPRoute, VerifyOTPRoute };
