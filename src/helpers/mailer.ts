import nodemailer from 'nodemailer';
import { User } from "@/models/userModel";
import bcrypt from 'bcryptjs';

enum EmailTypes {
    VERIFY = 'VERIFY',
    RESET = 'RESET',
}

interface IMailData {
    email: string;
    emailType: EmailTypes;
    userId: string;
}

export const sendEmail = async (mailData: IMailData) => {
    try {
        const { email, emailType, userId } = mailData;
        // Create encrypted token
        const hashedToken = await bcrypt.hash(userId, 10);

        switch (emailType) {
            case EmailTypes.VERIFY:
                await User.findByIdAndUpdate(
                    userId,
                    {
                        verifyToken: hashedToken,
                        verifyTokenExpiry: Date.now() + 60 * 60 * 1000,
                    }
                );
            case EmailTypes.RESET:
                await User.findByIdAndUpdate(
                    userId,
                    {
                        forgotPasswordToken: hashedToken,
                        forgotPasswordTokenExpiry: Date.now() + 60 * 60 * 1000,
                    }
                );
            default:
            // throw new Error('Invalid email type!');
        }

        const transporter = nodemailer.createTransport(
            {
                host: 'sandbox.smtp.mailtrap.io',
                port: 2525,
                auth: {
                    user: process.env.MAILER_NAME,
                    pass: process.env.MAILER_PASS,
                }
            }
        );

        const isVerifyReq = emailType === EmailTypes.VERIFY;

        const mailOptions = {
            from: 'user530@gmail.com',
            to: email,
            subject: isVerifyReq ? 'Verify your email' : 'Reset your password',
            html: `<p>Click <a href="${process.env.domain}/verifyemail?token=${hashedToken}">here</a> to ${isVerifyReq ? 'verify your email' : 'reset your password'}</p>`
        };

        const mailResponse = await transporter.sendMail(mailOptions);

        return mailResponse;
    } catch (error: any) {
        throw new Error(error.message)
    }
}