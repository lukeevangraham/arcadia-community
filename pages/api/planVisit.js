import axios from "axios";

// const nodemailer = require("nodemailer");

export default function handler(req, res) {
  // SPARKPOST CODE
  let data = JSON.stringify({
    recipients: [
      {
        address: "info@arcadia.church",
      },
      {

        address: "luke@grahamwebworks.com",
      },
    ],
    content: {
      from: {
        email: "luke@mail.grahamwebworks.com",
        name: "ARCADIA.CHURCH",
      },
      subject: "Visit Plan from arcadia.church",
      text: `${req.body.name} (${req.body.email}) just sent this 'plan a visit' form via arcadia.church:

      Date of a planned visit: ${req.body.date}
      Do they have kids: ${req.body.kids}
      Do they want a pastor to reach out: ${req.body.reachOut}`,
    },
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://api.sparkpost.com/api/v1/transmissions",
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.SPARKPOST_API_KEY,
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      res.status(200).json({ status: 200 });
    })
    .catch((error) => {
      console.log(error);
    });

  // NODEMAILER CODE
  // res.status(200).json({ status: 200 });

  // async function main() {
  //   let transporter = nodemailer.createTransport({
  //     host: "mail.gandi.net",
  //     port: "465",
  //     secure: "true",
  //     auth: {
  //       user: process.env.EMAIL,
  //       pass: process.env.EMAIL_PASS,
  //     },
  //   });

  //   let info = await transporter.sendMail({
  //     from: '"ARCADIA.CHURCH" <donotreply@arcadia.church>',
  //     // to: "info@arcadia.church",
  //     to: "luke@grahamwebworks.com, info@arcadia.church",
  //     subject: "Visit Plan from arcadia.church",
  //     text: `${req.body.name} (${req.body.email}) just sent this 'plan a visit' form via arcadia.church:

  //     Date of a planned visit: ${req.body.date}
  //     Do they have kids: ${req.body.kids}
  //     Do they want a pastor to reach out: ${req.body.reachOut}`,
  //   });

  //   transporter.verify(function (error, success) {
  //     if (error) {
  //       console.log(error);
  //     } else {
  //       console.log("Server is ready to take our messages", success);
  //     }
  //   });
  // }

  // main().catch(console.error);
}
