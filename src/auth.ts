import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";
import { phoneNumber } from "better-auth/plugins";
import { twilioSendOTP } from "./utils/otp/twilio";
import { users, sessions, accounts, verifications } from "march1-db";
import { getTempEmail } from "./utils/getTempEmail";
import { getTempName } from "./utils/getTempName";
import { validatePhoneNumber } from "./utils/validatePhoneNumber";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "pg" or "mysql"
    schema: {
      users,
      sessions,
      accounts,
      verifications,
    },
    //if all of them are just using plural form, you can just pass the option below
    usePlural: true,
  }),
  plugins: [
    phoneNumber({
      sendOTP: twilioSendOTP,
      signUpOnVerification: {
        getTempEmail,
        getTempName,
      },
      phoneNumberValidator: (phoneNumber) => validatePhoneNumber(phoneNumber),
    }),
  ],
});
