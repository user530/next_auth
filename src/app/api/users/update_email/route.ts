import { connect } from '@/dbConfig/dbConfig';
import { User } from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token, newPassword } = reqBody;
        console.log(token, newPassword);
        if (!newPassword || newPassword.length < 1)
            throw new Error('Invalid password!');

        const user = await User.findOne({ forgotPasswordToken: token });
        console.log(user);

        if (!user)
            throw new Error('User not found!');

        const salt = bcrypt.getSalt(token);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        // Clear token
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;
        // Update password
        await user.save();

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { error: (error as Error).message ?? 'Undefined error!', },
            { status: 500 },
        );
    }
}