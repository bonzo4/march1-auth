import { Elysia } from "elysia";
import { sendOTPRoute } from "./route/sendOTP";
import { verifyOTPRoute } from "./route/verifyOTP";

const app = new Elysia().use(sendOTPRoute).use(verifyOTPRoute).listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
