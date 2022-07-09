const nodemailer = require("nodemailer");
const cron = require("node-cron");
const User = require("../models/users");
const Problem = require("../models/problems");

const sendMail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: Number(process.env.EMAIL_PORT),
      secure: Boolean(process.env.SECURE),
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });
    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      html: text,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendMail;

// runs every tuesday,thursday,saturday of week
cron.schedule("10 10 * * 2,4,6", async () => {
  let userData = await User.find();
  userData.forEach((user) => {
    Problem.find({ userId: user._id, status: false, emailVerified: true }).then(
      (unsolved) => {
        let htmlString = `<h2>Total Questions: ${unsolved.length}</h2>`;
        unsolved.forEach((q) => {
          htmlString += ` <div><h3>Problem : <a href=${q.problemUrl} target="_blank">${q.problemUrl}</a><h3>`;
          htmlString += `<p><h3>Language: ${q.language}</h3></p>`;
          htmlString += `<p><h3>Notes: </h3>${q.notes}</p>`;
          htmlString += `<p><h3>Code: </h3>${q.code}</p></div><hr>`;
        });
        sendMail(user.email, "Unsolved Question Remainder", htmlString);
      }
    );
  });
});
