'use client';

import { useEffect, useState, ReactNode } from 'react';
import { loadCurrencyRates, loadCurrencySymbols } from '@/utils/currencyUtils';
import NavMenu from './NavMenu';
import NavBar from './NavBar';

interface Props {
    children: ReactNode;
}

export default function Layout({ children }: Props) {
    return (
        <>
            <NavBar />
            <main className='bg-slate-950'>{children}</main>
        </>
    );
}