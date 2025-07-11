'use client';

import { useEffect, useState, ReactNode } from 'react';
import { loadCurrencyRates, loadCurrencySymbols } from '@/utils/currencyUtils';

interface Props {
    children: ReactNode;
}

// Multi-language dictionary
const translations: Record<string, Record<string, string>> = {
    en: {
        welcome: 'Welcome',
        goodbye: 'Goodbye',
        about: 'About Us',
        selectLanguage: 'Select Language:',
        selectCurrency: 'Select Currency:',
    },
    id: {
        welcome: 'Selamat Datang',
        goodbye: 'Sampai Jumpa',
        about: 'Tentang Kami',
        selectLanguage: 'Pilih Bahasa:',
        selectCurrency: 'Pilih Mata Uang:',
    },
};

const supportedCurrencies = ['usd', 'idr', 'jpy', 'eur'];

export default function Layout({ children }: Props) {
    const [currencyRates, setCurrencyRates] = useState<Record<string, number>>({});
    const [currencySymbols, setCurrencySymbols] = useState<Record<string, string>>({});
    const [selectedCurrency, setSelectedCurrency] = useState('usd');

    const [language, setLanguage] = useState('en');

    useEffect(() => {
        (async () => {
            const allRates = await loadCurrencyRates();
            const allSymbols = await loadCurrencySymbols();

            const filteredRates: Record<string, number> = {};
            const filteredSymbols: Record<string, string> = {};

            supportedCurrencies.forEach(code => {
                if (allRates[code]) filteredRates[code] = allRates[code];
                if (allSymbols[code]) filteredSymbols[code] = allSymbols[code];
            });

            setCurrencyRates(filteredRates);
            setCurrencySymbols(filteredSymbols);

            const stored = localStorage.getItem('preferredCurrency');
            if (stored && filteredRates[stored]) {
                setSelectedCurrency(stored);
            }
        })();
    }, []);

    useEffect(() => {
        const elements = document.querySelectorAll('[rt-price]');
        elements.forEach(el => {
            const original = el.getAttribute('data-original');
            let baseValue: number;

            if (!original) {
                baseValue = parseFloat(el.textContent || '0');
                el.setAttribute('data-original', baseValue.toString());
            } else {
                baseValue = parseFloat(original);
            }

            const rate = currencyRates[selectedCurrency] || 1;
            const symbol = currencySymbols[selectedCurrency.toLowerCase()] || selectedCurrency.toUpperCase();
            const converted = baseValue * rate;

            el.textContent = `${symbol} ${converted.toLocaleString('en-US', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
            })}`;
        });
    }, [currencyRates, currencySymbols, selectedCurrency]);

    // For multi-language
    useEffect(() => {
        const storedLang = localStorage.getItem('language');
        if (storedLang && translations[storedLang]) {
            setLanguage(storedLang);
        }
    }, []);

    useEffect(() => {
        const elements = document.querySelectorAll('[rt-text]');
        elements.forEach((el) => {
            const key = el.getAttribute('rt-text');
            if (key && translations[language][key]) {
                el.textContent = translations[language][key];
            }
        });
    }, [language]);

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = e.target.value;
        setLanguage(selected);
        localStorage.setItem('language', selected);
    };

    const t = (key: string) => translations[language][key] || key; // Helper for translations

    return (
        <>
            <div className="flex justify-start p-4 space-x-4 bg-slate-950 border-b border-slate-600">
                {/* Language Selector */}
                <div className="relative">
                    <label htmlFor="lang" className="sr-only">
                        {t('selectLanguage')}
                    </label>
                    <select
                        id="lang"
                        value={language}
                        onChange={handleLanguageChange}
                        className="block w-full py-2 px-3 pr-8 border border-slate-600 bg-slate-950 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm appearance-none"
                    >
                        <option value="en" className="uppercase">EN</option>
                        <option value="id" className="uppercase">IN</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9l4.95 4.95z" />
                        </svg>
                    </div>
                </div>

                {/* Currency Selector */}
                <div className="relative">
                    <label htmlFor="currency" className="sr-only">
                        {t('selectCurrency')}
                    </label>
                    <select
                        id="currency"
                        value={selectedCurrency}
                        onChange={e => {
                            const value = e.target.value;
                            setSelectedCurrency(value);
                            localStorage.setItem('preferredCurrency', value);
                        }}
                        className="block w-full py-2 px-3 pr-8 border border-slate-600 bg-slate-950 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm appearance-none"
                    >
                        {Object.keys(currencyRates).map(code => (
                            <option key={code} value={code}>
                                {code.toUpperCase()}
                            </option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9l4.95 4.95z" />
                        </svg>
                    </div>
                </div>
            </div>

            <main>{children}</main>
        </>
    );
}