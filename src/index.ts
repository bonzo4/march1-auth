import { Elysia } from "elysia";
import jwt from "@elysiajs/jwt";
import { sendOTP, sendOTPBody } from "./utils/otp/sendOTP";
import { verifyOTP, verifyOTPBody } from "./utils/otp/verifyOTP";
import { onBeforeHandle } from "./utils/onBeforeHandle";
import { auth } from "./auth";

export const authApi = new Elysia()
  .use(
    jwt({
      name: "jwtAuth",
      secret: process.env.AUTH_JWT_SECRET!,
    })
  )
  .onError(({ code, set, error }) => {
    return error;
  })
  .onBeforeHandle(onBeforeHandle)
  .get("/", () => {
    return "Test";
  })

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
export type { AuthApi };
