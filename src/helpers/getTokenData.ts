import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { Token } from '@/types/token';

export const getTokenData = (request: NextRequest): Token => {
    try {
        const token = request.cookies.get('token')?.value || '';

        const tokenData = jwt.verify(token, process.env.TOKEN_SECRET!) as Token;

        return tokenData;
    } catch (error) {
        throw new Error((error as Error).message ?? 'Failed to parse the token!');
    }
} 