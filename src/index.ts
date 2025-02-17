import { Elysia } from "elysia";
import { sendOTPRoute } from "./route/sendOTP";
import { verifyOTPRoute } from "./route/verifyOTP";
import { healthCheckRoute } from "./route/healthCheck";

const authApi = new Elysia()
  .use(healthCheckRoute)
  .use(sendOTPRoute)
  .use(verifyOTPRoute)
  .listen(process.env.PORT!);

type AuthApi = typeof authApi;
export type { AuthApi };
