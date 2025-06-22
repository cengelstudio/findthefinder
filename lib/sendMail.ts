import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 465,
  auth: {
    user: 'admin@findthefinder.com',
    pass: 'findthefinder1+1',
  },
});

export default function sendEmail(to: string, title: string, content: string) {
  const mailOptions = {
    from: 'info@findthefinder.com',
    to: to,
    subject: title,
    text: content,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
