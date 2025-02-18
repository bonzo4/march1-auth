import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

type SendOTPOptions = {
  phoneNumber: string;
};

export async function twilioSendOTP({ phoneNumber }: SendOTPOptions) {
  await client.verify.v2
    .services(process.env.TWILIO_SERVICE_SID!)
    .verifications.create({ channel: "sms", to: phoneNumber });
}

type VerifyOTPOptions = {
  phoneNumber: string;
  code: string;
};

export async function twilioVerifyOTP({ phoneNumber, code }: VerifyOTPOptions) {
  const res = await client.verify.v2
    .services(process.env.TWILIO_SERVICE_SID!)
    .verificationChecks.create({ to: phoneNumber, code });

  return res.status;
}
