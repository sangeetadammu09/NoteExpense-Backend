import dotenv from "dotenv";
import nodeMailer from 'nodemailer';
dotenv.config();

export const emailConfig = (email,htmlContent,emailSubject,emailCategory) =>{
    let transporter = nodeMailer.createTransport({
        service: 'gmail',
        secure: true,
        port: 465,
        auth: {
          user: process.env.MAILSENDEREMAIL,
          pass: process.env.MAILPASSWORD,
        }
  });

      let mailOptions = {
        from: process.env.MAILSENDEREMAIL,
        to: email,
        subject: emailSubject,
        html: htmlContent,
        category: emailCategory,
      };


    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        res.send('Email sent successfully',info)
        return info
      }
    });

}



  

  
   