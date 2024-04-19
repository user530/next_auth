import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export const getTokenData = (request: NextRequest) => {
    try {
        const token = request.cookies.get('token')?.value || '';

        const tokenData = jwt.verify(token, process.env.TOKEN_SECRET!)

        return tokenData;
    } catch (error) {
        throw new Error((error as Error).message ?? 'Failed to parse the token!');
    }
} 