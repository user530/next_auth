"use client";
import { Token } from '@/types/token';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function ProfilePage() {
    const router = useRouter();

    const getUserData = async () => {
        const res = await axios.get('/api/users/me');
        const { data: userData } = res.data;

        router.push(`/profile/${(userData as Token).id}`);
    }

    const onLogout = async () => {
        try {
            await axios.get('/api/users/logout');

            toast.success('Logged out successfully!');

            router.push('/login');

        } catch (error) {
            console.log((error as Error).message);
            toast.error((error as Error).message ?? 'Something went wrong!');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <div><Toaster /></div>

            <h1 className="text-4xl mb-5">Profile</h1>
            <p className="text-2xl">ProfileData</p>

            <button
                onClick={getUserData}
                className="bg-grey-500 hover:bg-grey-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
                Get user data
            </button>

            <button
                onClick={onLogout}
                className="bg-grey-500 hover:bg-grey-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
                Logout
            </button>
        </div>
    )
}