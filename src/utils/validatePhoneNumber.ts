import { parsePhoneNumber } from "awesome-phonenumber";

export function validatePhoneNumber(phoneNumber: string): boolean {
  const parsedNumber = parsePhoneNumber(phoneNumber);
  if (!parsedNumber.valid) {
    return false;
  }
  if (parsedNumber.regionCode !== "US") {
    return false;
  }
  return true;
}
