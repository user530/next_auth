"use client";
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/navigation';
import axios, { AxiosError } from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function SignupPage() {
    const router = useRouter();

    const [user, setUser] = React.useState({
        email: '',
        password: '',
        name: '',
    });

    const [btnDisabled, setBtnDisabled] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(false);

    const onSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setIsLoading(true);
            const res = await axios.post('/api/users/signup', user);

            router.push('/login')
        } catch (error) {
            const message = error instanceof AxiosError && error.response?.data?.error
                ? error.response?.data?.error
                : 'Something went wrong during signup! Try again later.'

            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    }

    React.useEffect(
        () => {
            if (
                user.email.length > 0
                && user.name.length > 0
                && user.password.length > 0
            )
                setBtnDisabled(false);
            else
                setBtnDisabled(true);
        },
        [user]
    )

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <div><Toaster /></div>
            {
                isLoading
                    ? <p>Loading...</p>
                    : <>
                        <h1 className="text-2xl">Signup Page</h1>

                        <form className="flex flex-col justify-center p-4" onSubmit={onSignup}>
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


                            <div className="flex">
                                <label className="p-2 grow" htmlFor="name">Name</label>
                                <input
                                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                                    id="name"
                                    type="text"
                                    value={user["name"]}
                                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                                    placeholder="Name"
                                />
                            </div>

                            <button
                                type="submit"
                                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                                disabled={btnDisabled}
                            >Signup</button>

                            <Link href={"/login"} className="text-center underline text-sm">To the login page</Link>
                        </form>
                    </>
            }
        </div>
    )
}