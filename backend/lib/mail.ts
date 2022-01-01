import 'dotenv/config';
import { createTransport, getTestMessageUrl } from 'nodemailer';

const transport = createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const makeANiceEmail = (text: string) => `
  <div style="
    border: 1px solid black;
    padding: 20px;
    font-family: sans-serif;
    line-height: 2;
    font-size: 20px;
  ">
    <h2>Hello There!</h2>
    <p>${text}</p>
    <p>😘, Adam</p>
  </div>
  `;

interface Envelope {
  from: string;
  to?: string[] | null;
}
interface MailResponse {
  accepted: string[];
  rejected: null[] | null;
  envelopeTime: number;
  messageTime: number;
  messageSize: number;
  response: string;
  envelope: Envelope;
  messageId: string;
}

export const sendResetPasswordEmail = async (
  resetToken: string,
  to: string
): Promise<void> => {
  const info = (await transport.sendMail({
    to,
    from: 'spiceydev@gmail.com',
    subject: 'Your Password reset token',
    html: makeANiceEmail(`
      <a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}">
        Click here to reset your password
      </a>
    `),
  })) as MailResponse;
  if (process.env.MAIL_USER.includes('ethereal.email')) {
    console.log(`✉️ Message sent: ${getTestMessageUrl(info)}`);
  }

  // console.log('Message sent: %s', info.messageId);
  // console.log('Preview URL: %s', getTestMessageUrl(info));
};
