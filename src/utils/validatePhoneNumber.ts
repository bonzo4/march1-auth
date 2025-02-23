import { parsePhoneNumber } from "awesome-phonenumber";

export function validatePhoneNumber(
  phoneNumber: string
): { valid: true } | { valid: false; message: string } {
  const parsedNumber = parsePhoneNumber(phoneNumber);
  if (!parsedNumber.valid) {
    return { valid: false, message: "Invalid Phone Number" };
  }
  if (parsedNumber.regionCode !== "US") {
    return { valid: false, message: "US Phone Numbers Only" };
  }
  return { valid: true };
}
