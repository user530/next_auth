import { connect } from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/models/userModel';

connect();

export async function POST(request: NextRequest) {

    try {
        const reqBody = await request.json();
        const { token } = reqBody;

        const user = await User.findOne(
            {
                verifyToken: token,
                verifyTokenExpiry:
                {
                    $gt: Date.now()
                }
            }
        );

        if (!user)
            return NextResponse.json(
                { error: 'Invalid token!' },
                { status: 400 }
            );

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        await user.save();

        return NextResponse.json(
            { error: 'Email address verified!' },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Something went wrong' },
            { status: 500 }
        )

    }
}