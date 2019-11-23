import config from '../../config.json';
import dotenv from 'dotenv';

var nodemailer = require('nodemailer');
var validator = require("email-validator");

const result = dotenv.config();

if (result.error) {
    throw result.error;
}

config.sender_email_address = process.env.SENDER_EMAIL_ADDR;
config.sender_email_password = process.env.SENDER_EMAIL_PASSWORD;

var transporter = nodemailer.createTransport({
    service: config.sender_email_client,
    auth: {
        user: config.sender_email_address,
        pass: config.sender_email_password
    },
    tls: {
        rejectUnauthorized: false
    }
});

function sendConfirmationEmail(subEmail) {
    const result = {
        status: 200,
        error: false,
        message: "Thanks, we'll get back to you asap."
    };

    if (!validator.validate(subEmail)) {
        console.error("Not a valid email");
        result.status = 400;
        result.error = true;
        result.message = "Not a valid email";

        return result;
    }

    const mailOptions = {
        from: config.sender_email_address,
        to: subEmail,
        subject: '[writerslife] Thanks for Subscribing !',
        html: '<p>We will send you a notification email when writerslife.app goes live.</p><br/><p>We will not bother you with any other emails in the meantime.</p><br/><p> You can reply to this mail for more information or to take your email off the notification list. <p>'
    };

    const selfMailOptions = {
        from: config.sender_email_address,
        to: config.sender_email_address,
        subject: '[writerslife] New subber !',
        html: subEmail
    };

    transporter.sendMail(mailOptions, function (err, info) {

        if (err) {
            console.error(err);
            result.status = 400;
            result.error = true;
            result.message = "Something went wrong, please try again later.";

            return result;
        }
        else {
            console.info(info);
        }

        transporter.sendMail(selfMailOptions, function (err, info) {
            if (err) {
                console.error(err);
                result.status = 400;
                result.error = true;
                result.message = "Something went wrong, please try again later.";

                return result;
            }
            else {
                console.info(info);
            }
        });

    });

    return result;
}

module.exports = {
    sendConfirmationEmail: sendConfirmationEmail
}