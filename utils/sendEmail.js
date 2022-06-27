const nodemailer = require("nodemailer");
const config = require("../config");

module.exports = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: config.HOST,
      service: config.SERVICE,
      port: Number(config.EMAIL_PORT),
      secure: Boolean(config.SECURE),
      auth: {
        user: config.USER,
        pass: config.PASS,
      },
    });
    await transporter.sendMail({
      from: config.USER,
      to: email,
      subject: subject,
      text: text,
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.log("Email not sent");
    console.log(error);
  }
};
