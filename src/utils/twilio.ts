import twilio from "twilio";

type SendOTPOptions = {
  phoneNumber: string;
};

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export async function twilioSendOTP({ phoneNumber }: SendOTPOptions) {
  await client.verify.v2
    .services(process.env.TWILIO_SERVICE_SID!)
    .verifications.create({ channel: "sms", to: phoneNumber });
}
