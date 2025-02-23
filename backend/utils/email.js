const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const sendVerificationEmail = async (userEmail, userId) => {
    try {
        // Generate a verification token (JWT)
        const verificationToken = jwt.sign(
            { userId: userId },
            process.env.JWT_SECRET, // Use a secret key stored in .env
            { expiresIn: '1h' } // Token expires in 1 hour
        );

        // Create a verification URL with the token
        const verificationUrl = `http://` + process.env.FRONTEND_URI+ `/verify-email?token=${verificationToken}`;

        // Set up email transporter (using Gmail here, but you can use other services like SendGrid)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER, // Your email address
                pass: process.env.GMAIL_PASSWORD, // Your email password
            },
        });

        // Email options
        const mailOptions = {
            from: process.env.GMAIL_USER, // Sender's email address
            to: userEmail, // Recipient's email address
            subject: 'Email Verification',
            html: `
        <h2>Welcome to Our App!</h2>
        <p>Click the link below to verify your email address:</p>
        <a href="${verificationUrl}">Verify Your Email</a>
      `,
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        console.log('Verification email sent successfully');
    } catch (error) {
        console.error('Error sending verification email:', error);
    }
};

module.exports = sendVerificationEmail;
