import { NextResponse, NextRequest } from 'next/server';
import axios from 'axios';
import { getTokenData } from './helpers/getTokenData';

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    const isPublic = path === '/'
        || path === '/login'
        || path === '/signup';

    const token = request.cookies.get('token')?.value || '';

    // Public path
    if (isPublic)
        return NextResponse.next();

    // Private path for unauthenticated user
    if (!isPublic && !token)
        return NextResponse.redirect(new URL('/login', request.nextUrl));

    console.log('Middleware validating token');
    const result = await axios.get('/api/users/me');
    console.log(result);

};

export const config = {
    matcher: [
        '/',
        '/profile/:path*',
        '/login',
        '/signup',
    ]
};