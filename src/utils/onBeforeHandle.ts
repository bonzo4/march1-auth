import { error } from "elysia";
import type { JwtType } from "./types/jwt";
import type { SetType } from "./types/set";

type Options = {
  request: Request;
  set: SetType;
  jwtAuth: JwtType;
};

export async function onBeforeHandle({ request, set, jwtAuth }: Options) {
  const authorization = request.headers.get("authorization");
  if (!authorization) {
    set.status = "Unauthorized";
    return error("Unauthorized");
  }
  const authorized = await jwtAuth.verify(authorization);
  if (!authorized) {
    set.status = "Unauthorized";
    return error("Unauthorized");
  }
}
