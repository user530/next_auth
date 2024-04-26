import { connect } from '@/dbConfig/dbConfig';
import { EmailTypes, sendEmail } from '@/helpers/mailer';
import { User } from '@/models/userModel';
import bcrypt from 'bcryptjs';
import { NextResponse, NextRequest } from 'next/server';

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { name, email, password } = reqBody;

        if (!name)
            return NextResponse.json(
                { error: 'Please provide user name!' },
                { status: 400 }
            );

        if (!email)
            return NextResponse.json(
                { error: 'Please provide an email!' },
                { status: 400 }
            );

        if (!password)
            return NextResponse.json(
                { error: 'Please provide a password!' },
                { status: 400 }
            );

        const alreadyExists = await User.findOne({ email });

        if (alreadyExists)
            return NextResponse.json(
                { error: 'This email is already in use!' },
                { status: 400 }
            );

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        const result = await newUser.save();

        // Verification email
        await sendEmail({
            email: result.email,
            emailType: EmailTypes.VERIFY,
            userId: result.id,
        })

        return NextResponse.json(
            { message: 'User created!', success: true, data: result },
            { status: 201 },
        );

    } catch (error) {
        return NextResponse.json(
            { error: (error as Error).message ?? 'Undefined error!', },
            { status: 500 },
        );
    }
}
