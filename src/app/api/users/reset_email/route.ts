
import { connect } from '@/dbConfig/dbConfig';
import { User } from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { sendEmail, EmailTypes } from '@/helpers/mailer';

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { id, oldPassword } = reqBody;

        const user = await User.findOne({ _id: id });

        if (!user)
            throw new Error('User not found!');

        const isValidPassword = bcrypt.compareSync(oldPassword, user.password);

        if (!isValidPassword)
            throw new Error('Invalid credentials!');

        // Send reset email
        sendEmail({
            email: user.email,
            emailType: EmailTypes.RESET,
            userId: user._id.toString(),
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { error: (error as Error).message ?? 'Undefined error!', },
            { status: 500 },
        );
    }
}