"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { HiMoon, HiSun } from "react-icons/hi";

import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useSession, signIn, signOut } from "next-auth/react";
import ChapterSelector from '@/components/chapterselector';
import styles from '../styles/Home.module.css';
import { ThemeProvider } from 'next-themes';
import Providers from "@/components/providers";
import Toggle from "@/components/toggle-icon";

const Homepage: NextPage = () => {
    const { data: session } = useSession();

    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <Providers>
            <div className="min-h-screen bg-slate-200 dark:bg-cyan-950">
                <Head>
                    <title>HolyGlipms</title>
                    <meta name="description" content="Generated by create next app" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <div className="min-h-screen flex flex-col" >

                    <nav className="p-4 border-b dark:border-slate-600">
                        <div id="nav-allContents" className="flex justify-between items-center">
                            <a href="#" className="text-black dark:text-white font-semibold text-xl">HolyGlimps</a>
                            <div id="nav-end" className="flex items-center justify-between">
                                <div id="toggle-icon" className="transition duration-500 ease-in-out rounded-full border border-slate-700 mr-4">
                                    <Toggle />
                                </div>
                                <div className={styles.signup}>
                                    {session && session.user ? (
                                        <button className="text-black dark:text-white font-semibold text-xl bg-blue-500 rounded-md px-2 py-1 border border-gray-400 dark:border-gray-700" onClick={() => signOut()}>Sign out</button>
                                    ) : (
                                        <button className="text-black dark:text-white font-semibold text-xl bg-blue-500 rounded-md px-2 py-1 border border-gray-400 dark:border-gray-700" onClick={() => signIn()}>Sign in</button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </nav>

                    <main className="flex-grow flex items-center justify-center">
                        <div className="text-center">
                            {session && session.user ? (
                                <div>
                                    <div className="mb-4 rounded-lg bg-lime-500 px-6 py-5">
                                        <h4 className="mb-2 text-2xl font-medium">Success!</h4>
                                        <p className="mb-4"> Hey {session.user.name}, happy you logged in with {session.user.email} </p>
                                        <hr className="opacity-30" />
                                        <p className="mb-0 mt-4"> Get Ready to read the ultimate bhagwat gita </p>
                                    </div>

                                    <div className='flex items-center justify-center pt-2'>
                                        <ChapterSelector />
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <p className="text-xl font-semibold text-blue-500 pb-2">You need to sign in to start reading Bhagwat Gita</p>
                                    <button className="text-black dark:text-white border border-gray-400 dark:border-gray-700 rounded-md px-1 font-bold text-xl bg-blue-500" onClick={() => signIn()}>Sign in</button>
                                </>
                            )}
                        </div>
                    </main>

                </div>

            </div>
        </Providers>
    );
};

export default Homepage;