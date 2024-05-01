"use client";
import axios, { AxiosError } from 'axios';
import React from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function UserProfile({ params }: any) {
    const [oldPassword, setOldPassword] = React.useState<string>('');
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const onReset = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setIsLoading(true);
            console.log('reset fired');
            await axios.post('/api/users/reset_email', { id: params.id, oldPassword });

        } catch (error) {
            const message = error instanceof AxiosError && error.response?.data?.error
                ? error.response?.data?.error
                : 'Something went wrong during reset! Try again later.'

            toast.error(message);
        } finally {
            setIsLoading(false);
        }

    }

    return (
        <>
            <div><Toaster /></div>
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <h1 className="text-4xl mb-5">Profile</h1>
                <p className="text-2xl mb-5">ProfileData
                    <span className="p-2 ml-2 rounded bg-orange-500 text-black">{params.id}</span>
                </p>

                <div className='flex flex-col items-center justify-center'>
                    <h2 className='content-fit'>Reset password</h2>
                    <form className='flex flex-col justify-center p-4' onSubmit={onReset}>
                        <div className="flex">
                            <label className="p-2 grow" htmlFor="password">Old password</label>
                            <input
                                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                                id="password"
                                type="password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit"
                            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                            disabled={oldPassword.trim().length < 1}
                        >Reset password</button>
                    </form>
                </div>
            </div>
        </>
    )
}