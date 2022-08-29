const nodemailer = require("nodemailer");
const { google } = require("googleapis");
require("dotenv").config();

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

async function sendMail(email, password) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "jordan@2bdigital.co",
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    subject = "Votre mot de passe";

    const mailOptions = {
      from: "Jordan <jordan@2bdigital.co>",
      to: email,
      subject: subject,
      text: "Votre nouveau mot de passe est: " + password,
      html: "",
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (err) {
    return err;
  }
}

// sendMail()
//   .then((result) => console.log("Email sent ", result))
//   .catch((error) => console.log(error));

exports.sendMail = sendMail;
