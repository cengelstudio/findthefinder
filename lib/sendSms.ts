import { Twilio } from 'twilio';
import type { SmsPayload } from '../types/services';

const client = new Twilio(
  process.env.TWILIO_ACCOUNTSID || '',
  process.env.TWILIO_AUTHTOKEN || ''
);

export default function sendSms({ message, to }: SmsPayload) {
  return client.messages
    .create({
      body: message,
      from: process.env.TWILIO_FROMNUMBER,
      to: to,
    })
    .then((message: any) => console.log(message.sid));
}
