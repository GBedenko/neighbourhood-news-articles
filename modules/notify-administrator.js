'use strict'

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'bedenkog.local.news@gmail.com',
    pass: 'localnews-temp'
  }
});

exports.emailAdministrator = () => {

    const mailOptions = {
        from: 'bedenkog.local.news@gmail.com',
        to: 'genaro.bedenko@outlook.com',
        subject: 'New post has been created on the Local News Application!',
        text: 'Please check the Local News Application and approve the new content someone created: http://localhost:8080/admin_dashboard'
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
}