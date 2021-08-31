import { createTransport } from "nodemailer";

export function sendEmail(
  service: string,
  user: string,
  pw: string,
  to: string,
  subject: string,
  body: string
): void {
  const transport = createTransport({
    service,
    auth: {
      user,
      pass: pw,
    },
  });

  const mailOpts = {
    from: user,
    to,
    subject,
    html: body,
  };

  transport.sendMail(mailOpts, (err, _info) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`EMAIL SENT!`);
    }
  });
}
