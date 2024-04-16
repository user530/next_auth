"use client";
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function LoginPage() {
    const [user, setUser] = React.useState({
        email: '',
        password: '',
    });

    const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('login!');
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-2xl">Login Page</h1>

            <form className="flex flex-col justify-center p-4" onSubmit={onLogin}>
                <div className="flex">
                    <label className="p-2 grow" htmlFor="email">Email</label>
                    <input
                        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                        id="email"
                        type="text"
                        value={user["email"]}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        placeholder="Email"
                    />
                </div>

                <div className="flex">
                    <label className="p-2 grow" htmlFor="password">Password</label>
                    <input
                        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                        id="password"
                        type="password"
                        value={user["password"]}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        placeholder="password"
                    />
                </div>

                <button type="submit" className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Login</button>

                <Link href={"/signup"} className="text-center underline text-sm">To the signup page</Link>
            </form>
        </div>
    )
}