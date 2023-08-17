import React from "react";
import {ClerkProvider} from '@clerk/nextjs';
import '../globals.css';

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

export const metadata = {
    title:'Threads',
    description: 'A next.js meta thread application'
}

const inter = Inter({subsets:["latin"]});

export default function RootLayout({
    children
}:{
    children:React.ReactNode
}) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={`${inter.className} bg-dark-1`}>
                    {children}
                </body>

            </html>
        </ClerkProvider>
    )
}