import { Elysia } from "elysia";
import { sendOTPRoute } from "./route/sendOTP";
import { verifyOTPRoute } from "./route/verifyOTP";
import { healthCheckRoute } from "./route/healthCheck";

const app = new Elysia()
  .use(healthCheckRoute)
  .use(sendOTPRoute)
  .use(verifyOTPRoute)
  .listen(process.env.PORT!);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
