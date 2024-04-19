import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const res = NextResponse.json(
            { message: 'Log out successfull!', success: true },
            { status: 200 },
        );

        res.cookies.set('token', '',
            {
                httpOnly: true,
                expires: new Date(),
            }
        );

        return res;
    } catch (error) {
        return NextResponse.json(
            { error: (error as Error).message ?? 'Undefined error!', },
            { status: 500 },
        );
    }
}