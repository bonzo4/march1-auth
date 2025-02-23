import { describe, expect, test, mock, it } from "bun:test";
import { sendOTP } from "../src/utils/otp/sendOTP";
import jwt from "@elysiajs/jwt";
import { SetType } from "../src/utils/types/set";
import { JwtType } from "../src/utils/types/jwt";

const jwtAuth: JwtType = jwt({
  name: "jwtAuth",
  secret: process.env.AUTH_JWT_SECRET!,
}).decorator.jwtAuth;

const set: SetType = {};

const sendPhoneNumberOTP = async ({
  body: { phoneNumber },
}: {
  body: { phoneNumber: string };
}) => {
  return { code: "code" };
};

describe("Send OTP", () => {
  it("Should send OTP for a valid token", async () => {
    const body = { token: await jwtAuth.sign({ phoneNumber: "+12345678910" }) };
    const res = await sendOTP({ jwtAuth, set, body, sendPhoneNumberOTP });
    expect(res).toBe("Code sent");
  });

  it("Should throw unauthorized", async () => {
    try {
      const body = { token: "1" };
      const res = await sendOTP({ jwtAuth, set, body, sendPhoneNumberOTP });
    } catch (e: any) {
      expect(e.response).toBe("Unauthorized");
    }
  });

  it("Should throw missing phone number", async () => {
    try {
      const body = {
        token: await jwtAuth.sign({}),
      };
      const res = await sendOTP({ jwtAuth, set, body, sendPhoneNumberOTP });
    } catch (e: any) {
      expect(e.response).toBe("Missing Phone Number");
    }
  });

  it("Should throw invalid phone number", async () => {
    try {
      const body = {
        token: await jwtAuth.sign({ phoneNumber: "2345678910" }),
      };
      const res = await sendOTP({ jwtAuth, set, body, sendPhoneNumberOTP });
    } catch (e: any) {
      expect(e.response).toBe("Invalid Phone Number");
    }
  });

  it("Should throw US phone numbers only", async () => {
    try {
      const body = {
        token: await jwtAuth.sign({ phoneNumber: "+12505550199" }),
      };
      const res = await sendOTP({ jwtAuth, set, body, sendPhoneNumberOTP });
    } catch (e: any) {
      expect(e.response).toBe("US Phone Numbers Only");
    }
  });
});
