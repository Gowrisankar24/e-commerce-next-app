import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { auth, signIn, signOut } from '../../auth';
import { BadgePlus, LogOut } from 'lucide-react';

const NavBar = async () => {
    const session = await auth();
    return (
        <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
            <nav className="flex justify-between items-center">
                <div className="flex">
                    <Link href="/">
                        <Image
                            // src="/images.jpg"
                            src="/logo.png"
                            alt="logo"
                            width={40}
                            height={40}
                            className="rounded-lg backdrop-contrast-75 backdrop-blur-md"
                        />
                    </Link>
                    <h1 className="mx-3 text-3xl font-semibold tracking-wider">Elevate Ventures</h1>
                </div>

                <div className="flex items-center gap-5 text-black">
                    {session && session?.user ? (
                        <>
                            <Link href={'/startup/create'}>
                                <span className="max-sm:hidden">Create</span>
                                <BadgePlus className="size-6 sm:hidden" />
                            </Link>
                            <form
                                action={async () => {
                                    'use server';
                                    await signOut({ redirectTo: '/' });
                                }}
                            >
                                <button type="submit">
                                    <span className="max-sm:hidden">Logout</span>
                                    <LogOut className="size-6 sm:hidden text-red-500" />
                                </button>
                            </form>

                            <Link href={`/users/${session?.user?.id}`}>
                                {/* <span className="max-sm:hidden">{session?.user?.name}</span> */}
                                <Image
                                    src={session?.user?.image || 'https://placehold.co/48x48'}
                                    alt={session?.user?.name || 'Author'}
                                    width={48}
                                    height={48}
                                    className="rounded-full size-10"
                                />
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
