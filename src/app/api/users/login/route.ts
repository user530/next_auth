import { connect } from '@/dbConfig/dbConfig';
import { User } from '@/models/userModel';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

connect();

export async function POST(request: NextRequest) {
    try {
        const requestBody = await request.json();
        const { email, password } = requestBody;

        const user = await User.findOne({ email });

        if (!user)
            return NextResponse.json(
                { error: 'User not found!' },
                { status: 404 }
            );

        const validPassword = await bcrypt.compare(
            password, user.password
        );

        if (!validPassword)
            return NextResponse.json(
                { error: 'Invalid credentials!' },
                { status: 401 }
            );

        const tokenData = {
            id: user._id,
            username: user.name,
            email: user.email,
        };

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1h" });

        const res = NextResponse.json(
            { message: 'Login successfull!', success: true },
            { status: 200 },
        );

        res.cookies.set("token", token, {
            httpOnly: true,
        });

        return res;

    } catch (error) {
        return NextResponse.json(
            { error: (error as Error).message ?? 'Undefined error!', },
            { status: 500 },
        )
    }
} 