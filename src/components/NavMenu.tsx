'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

interface NavItem {
  name: string;
  href?: string;
  dropdown?: {
    name: string;
    href: string;
  }[];
}

const navItems: NavItem[] = [
  { name: 'Beranda', href: '/' },
  {
    name: 'Layanan',
    dropdown: [
      { name: 'Desain Web', href: '/layanan/desain-web' },
      { name: 'Pengembangan Aplikasi', href: '/layanan/aplikasi' },
    ],
  },
  {
    name: 'Produk',
    dropdown: [
      { name: 'Template', href: '/produk/template' },
      { name: 'Plugin', href: '/produk/plugin' },
    ],
  },
  { name: 'Tentang', href: '/tentang' },
  { name: 'Kontak', href: '/kontak' },
];

const NavMenu: React.FC = () => {
  return (

    <ul className="flex justify-center flex-row">
      {navItems.map((item, index) => (
        <li key={index} className="group relative m-0 text-white text-lg font-medium leading-6 capitalize px-6 cursor-pointer">
          {item.dropdown ? (
            <>
              <button className="flex items-center gap-1 py-6 text-white transition">
                {item.name}
                <ChevronDown
                  size={16}
                  className="transition-transform duration-200 group-hover:rotate-180"
                />
              </button>
              <div className="absolute left-0 mt-2 px-2 w-48 bg-slate-900 border-slate-700 border rounded-md shadow-lg opacity-0 scale-y-0 group-hover:opacity-100 group-hover:scale-y-100 transition-all duration-200 origin-top z-10">
                <ul className="py-2">
                  {item.dropdown.map((subItem, idx) => (
                    <li key={idx}>
                      <Link
                        href={subItem.href}
                        className="block px-4 py-2 text-sm text-gray-100 hover:bg-slate-800 hover:rounded-md  transition"
                      >
                        {subItem.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <Link
              href={item.href ?? '#'}
              className="m-0 flex items-center gap-1 py-6 text-white text-lg font-medium leading-6 capitalize cursor-pointer transition"
            >
              {item.name}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
};

export default NavMenu;
