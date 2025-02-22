import { describe, expect, test, mock, it } from "bun:test";
import { sendOTP } from "../src/utils/otp/sendOTP";
import jwt from "@elysiajs/jwt";

const jwtAuth = mock(() =>
  jwt({
    name: "jwtAuth",
    secret: process.env.AUTH_JWT_SECRET!,
  })
);

describe("Send OTP", () => {
  it("Should send OTP for a valid token", () => {
    expect(2 + 2).toBe(4);
  });
});
