const path = require('path');
const express = require('express');
const app = express();
const transporter = require('./config');
const dotenv = require('dotenv');
dotenv.config();

const buildPath = path.join(__dirname, '..', 'build');
app.use(express.json());
app.use(express.static(buildPath));

app.post('/send', (req, res) => {
  try {
    const mailOptions = {
      from: req.body.email,
      to: process.env.toemail,
      subject: req.body.subject,
      html: `
        <p>You have a new contact request</p>
        <h3>Contact details</h3>
        <ul>
          <li>Name: ${req.body.name}</li>
          <li>Email: ${req.body.email}</li>
          <li>Subject: ${req.body.subject}</li>
          <li>Message: ${req.body.message}</li>
        </ul>
      `
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        res.status(500).send({
          success: false,
          message: 'Something went wrong. You can email me instead: c.williams4456@gmail.com'
        });
      } else {
        res.send({
          success: true,
          message: 'Thanks for getting in touch. I will get back to you shortly.'
        });
      }
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Something went wrong. You can email me instead: c.williams4456@gmail.com'
    });
  }
});

app.listen(process.env.PORT || 3030, () => {
  console.log('server start on post 3030')
});
