import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { auth, signIn, signOut } from '../../../auth';

const NavBar = async () => {
    const session = await auth();
    console.log('session', session);
    return (
        <header className="px-1 py-1 bg-white shadow-sm font-work-sans">
            <nav className="flex justify-between items-center">
                <Link href="/">
                    <Image src="/logo.png" alt="logo" width={70} height={40} />
                </Link>

                <div className="flex  items-center gap-5 text-black">
                    {session && session?.user ? (
                        <>
                            <Link href={'/startup/create'}>
                                <span>Create</span>
                            </Link>
                            <form
                                action={async () => {
                                    'use server';
                                    await signOut({ redirectTo: '/' });
                                }}
                            >
                                <button type="submit">
                                    <span>Logout</span>
                                </button>
                            </form>

                            <Link href={`/users/${session?.user?.id}`}>
                                <span>{session?.user?.name}</span>
                            </Link>
                        </>
                    ) : (
                        <form
                            action={async () => {
                                'use server';
                                await signIn('google');
                            }}
                        >
                            <button type="submit">
                                <span>Sign In</span>
                            </button>
                        </form>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default NavBar;
