const nodemailer = require("nodemailer");

exports.sendMail = async (config) => {
  let account = await nodemailer.createTestAccount();
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "mayowad43@gmail.com",
        pass: "DevDabiriMayowa",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const info = await transporter.sendMail({
      from: "info@dabirimayowa.com",
      ...config,
    });

    return `Preview URL: %s', ${nodemailer.getTestMessageUrl(info)}`;
  } catch (err) {
    throw new Error(err.message);
  }
};
