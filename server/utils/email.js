const nodemailer = require('nodemailer')

/**
 * Send email to any email address
 * @param  {String} receiverEmail Email of the receiver
 * @param  {String} mailBody Content of the mail to be sent
 * @param  {String} emailSubject Subject of the email to be sent
 */

//EMAIL , RESETURL, EMAIL SUBJECT 

const sendEmail = async (receiverEmail, mailBody, emailSubject) => {

    let testAccount = await nodemailer.createTestAccount();

    const transporter = await nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    })

    const mailOptions = {
        from: 'trishankusarma123@gmail.com', // sender address
        to: receiverEmail, // list of receivers
        subject: emailSubject , // Subject line
        text: mailBody // plain text body
      }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
        } else {
           console.log('Email Send', info.response);
           console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        }
    })
}

module.exports = {
    sendEmail
}
