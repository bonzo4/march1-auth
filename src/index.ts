import { Elysia } from "elysia";
import jwt from "@elysiajs/jwt";
import { sendOTP, sendOTPBody } from "./utils/otp/sendOTP";
import { verifyOTP, verifyOTPBody } from "./utils/otp/verifyOTP";
import { onBeforeHandle } from "./utils/onBeforeHandle";

const authApi = new Elysia()

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

  .post("/sendOTP", sendOTP, { body: sendOTPBody })
  .post("/verifyOTP", verifyOTP, { body: verifyOTPBody })
  .listen(process.env.PORT!);

type AuthApi = typeof authApi;
export type { AuthApi };
