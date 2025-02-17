import Elysia from "elysia";

export const healthCheckRoute = new Elysia().get(
  "/healthy",
  () => "This service is healthy"
);
