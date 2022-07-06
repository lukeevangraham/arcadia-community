const nodemailer = require("nodemailer")

export default function handler(req, res) {
    res.status(200).json({ status: 200 });
  
    async function main() {
      let transporter = nodemailer.createTransport({
        host: "mail.gandi.net",
        port: "465",
        secure: "true",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASS
        }
      })
  
      let info = await transporter.sendMail({
        from: '"ARCADIA.CHURCH" <donotreply@arcadia.church>',
        // to: "info@arcadia.church",
        to: "luke@grahamwebworks.com",
        subject: "Prayer Request from arcadia.church",
        text: `${req.body.name} (${req.body.email}) just sent this prayer request via arcadia.church:
      
      ${req.body.request}`,
      });
  
  
      transporter.verify(function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log("Server is ready to take our messages", success);
        }
      });
    }
  
    main().catch(console.error);
  }
  