import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendEmail = async (
  to: string,
  subject: string,
  html: string // using HTML instead of text
) => {
  const info = await transporter.sendMail({
    from: `"Syncspace" <${process.env.FROM_EMAIL}>`,
    to,
    subject,
    html,
  });
};
