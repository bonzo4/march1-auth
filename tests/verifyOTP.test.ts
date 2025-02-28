import jwt from "@elysiajs/jwt";
import { JwtType } from "../src/utils/types/jwt";
import { SetType } from "../src/utils/types/set";
import { describe, expect, it } from "bun:test";
import { verifyOTP } from "../src/utils/otp/verifyOTP";
import { error } from "elysia";

const jwtAuth: JwtType = jwt({
  name: "jwtAuth",
  secret: process.env.AUTH_JWT_SECRET!,
}).decorator.jwtAuth;

const set: SetType = {};

const verifyPhoneNumber = async ({
  body: { phoneNumber, code },
}: {
  body: { phoneNumber: string; code: string };
}) => {
  return {
    status: true,
    token: "1",
    user: {
      id: "1",
      createdAt: new Date(),
      email: "@",
      emailVerified: false,
      name: "test",
      phoneNumber: "1",
      phoneNumberVerified: true,
      updatedAt: new Date(),
    },
  };
};

const verifyPhoneNumberFail = async ({
  body: { phoneNumber, code },
}: {
  body: { phoneNumber: string; code: string };
}) => {
  return null;
};

describe("Verify OTP", () => {
  it("Should verify OTP for a valid token", async () => {
    const body = { token: await jwtAuth.sign({ phoneNumber: "1", code: "1" }) };
    const res = await verifyOTP({ jwtAuth, set, body, verifyPhoneNumber });
    expect(res).toEqual({
      status: true,
      token: "1",
      user: {
        id: "1",
        createdAt: new Date(),
        email: "@",
        emailVerified: false,
        name: "test",
        phoneNumber: "1",
        phoneNumberVerified: true,
        updatedAt: new Date(),
      },
    });
  });

  it("Should throw unauthorized", async () => {
    const body = { token: "1" };
    const res = await verifyOTP({ jwtAuth, set, body, verifyPhoneNumber });
    expect(res).toEqual(error("Unauthorized", "Unauthorized"));
  });

  it("Should throw missing phone number", async () => {
    const body = {
      token: await jwtAuth.sign({ code: "1" }),
    };
    const res = await verifyOTP({ jwtAuth, set, body, verifyPhoneNumber });
    expect(res).toEqual(error("Bad Request", "Missing Phone Number"));
  });

  it("Should throw missing code", async () => {
    const body = {
      token: await jwtAuth.sign({ phoneNumber: "1" }),
    };
    const res = await verifyOTP({ jwtAuth, set, body, verifyPhoneNumber });
    expect(res).toEqual(error("Bad Request", "Missing Code"));
  });

  it("Should catch a failed request", async () => {
    const body = {
      token: await jwtAuth.sign({ phoneNumber: "1", code: "1" }),
    };
    const res = await verifyOTP({
      jwtAuth,
      set,
      body,
      verifyPhoneNumber: verifyPhoneNumberFail,
    });
    expect(res).toEqual(error("Bad Request", "Verification Failed"));
  });
});
