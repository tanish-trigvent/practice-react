import nodemailer from 'nodemailer';



const SendMail = (data, reciepent) => {

    console.log(reciepent)
    //  Create a transporter
    const transporter = nodemailer.createTransport({
        service: 'Gmail', // Use your email service provider, e.g., Gmail, Outlook, etc.
        auth: {
            user: process.env.Email, // Your email address
            pass: process.env.EMAIL_PASSWORD_SECRET// Your email password or App Password if using Gmail
        }
    });

    // Define the email options

    const mailOptions = {
        from: process.env.Email, // Sender address
        to: reciepent, // List of receivers
        subject: 'Your OTP Code', // Subject line
        html: data // The rendered HTML from EJS template
    };

    //   Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent successfully:', info.response);
        }
    });

}

export default SendMail




