const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  service: 'gmail', // true for port 465, false for other ports
  auth: {
    user: process.env.USER,
    pass:process.env.APP_PASSWORD,
  },
  
});

const sendMail = async (options) => {
  const { email, subject, text, html } = options;

  const mailOptions = {
    from: {
      name: "Find Recipe",
      address: process.env.USER
    },
    to: email,
    subject:subject, 
    text: text || "", 
    html: html || "",
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    return false;
  } catch (error) {
    console.error('Error in sending email: ', error.message, error.stack);
    return true;
  }
};

module.exports = { sendMail };