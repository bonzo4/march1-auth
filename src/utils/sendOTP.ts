import { auth } from "../auth";

export async function sendOTP(phoneNumber: string) {
  const code = await auth.api.sendPhoneNumberOTP({
    body: {
      phoneNumber,
    },
  });

  return code;
}
