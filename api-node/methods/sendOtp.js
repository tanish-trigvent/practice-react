import ejs from 'ejs'
import path from 'path';
import SendMail from './sendMail.js';
import { fileURLToPath } from 'url';

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

const sendOtp = (reciepent) => {

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname('./', __filename);

    const otp = generateOTP();

    ejs.renderFile(path.join(__dirname, '/templates/template-otp.ejs'), { otp }, (err, data) => {
        if (err) {
            console.error('Error rendering EJS:', err);
        } else {

            // Send the email with the OTP 
            SendMail(data, reciepent);
        }
    });

    return otp
}


export default sendOtp