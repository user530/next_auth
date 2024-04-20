import { getTokenData } from '@/helpers/getTokenData';
import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig';
import { User } from '@/models/userModel';

connect();

export async function GET(request: NextRequest) {
    try {
        const { id, email, username } = getTokenData(request);

        if (!id || !email || !username)
            throw new Error('Invalid token data!');

        const user = await User.findById(id).select('-password');

        if (!user)
            throw new Error('User not found!');

        return NextResponse.json(
            { message: 'User found!', success: true, data: user },
            { status: 200 },
        );

    } catch (error) {
        // Send back success: failed -> listen to it in middleware and based on the getme result -> handle reroute

        return NextResponse.json(
            { error: (error as Error).message ?? 'Undefined error!', },
            { status: 500 },
        )
    }
}