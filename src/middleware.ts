import { NextResponse, NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    const isPublic = path === '/login' || path === '/signup';

    const token = request.cookies.get('token')?.value || '';

    // If user already logged in -> no need to login or signup
    if (isPublic && token)
        return NextResponse.redirect(new URL('/', request.nextUrl));

    // Private path for unauthenticated user
    if (!isPublic && !token)
        return NextResponse.redirect(new URL('/login', request.nextUrl));

};

export const config = {
    matcher: [
        '/',
        '/profile/:path*',
        '/login',
        '/signup',
    ]
};