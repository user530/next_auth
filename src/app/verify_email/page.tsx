"use client";

import axios from 'axios';
import Link from 'next/link';
import React from 'react';

export default function VerifyEmailPage() {
    const [token, setToken] = React.useState<string>('');
    const [isVerified, setIsVerified] = React.useState<boolean>(false);
    const [errors, setErrors] = React.useState<boolean>(false);

    const verifyUserEmail = async () => {
        try {
            await axios.post('/api/users/verify_email', { token });
            setIsVerified(true);
        } catch (error) {
            setErrors(true);
            console.log(error);
        }
    };

    React.useEffect(
        () => {
            const urlToken = window.location.search.split('=')[1];
            setToken(urlToken ?? '');
        },
        []
    );

    React.useEffect(
        () => {
            if (token.length > 0) {
                verifyUserEmail();
            }
        },
        [token]
    );

    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <h1 className='text-4xl'>Verify email</h1>
            <h2 className='p-2 bg-orange-500 text-black'>{token ? token : 'no token'}</h2>

            {
                isVerified && (
                    <div>
                        <h2 className='text-2xl'>Email verified</h2>
                        <Link href={'/login'} className='text-blue-500'>
                            Login
                        </Link>
                    </div>
                )
            }

            {
                errors && (
                    <div>
                        <h2 className='text-2xl bg-red-500 text-black'>Error</h2>
                    </div>
                )
            }
        </div>
    )
}