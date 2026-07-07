import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0B0B1A',
};

export const metadata: Metadata = {
  title: "Togthr",
  description: "Your private space, built for two",
};

const FORCE_DARK_SCRIPT = `(function(){try{var d=document.documentElement;d.className=(d.className||'')+' dark';var s=d.style;s.colorScheme='dark';s.backgroundColor='#0B0B1A';d.setAttribute('data-theme','dark');}catch(e){var st=document.createElement('style');st.textContent='html,body{background:#0B0B1A!important;color-scheme:dark;}';if(document.head){document.head.appendChild(st);}else{document.addEventListener('DOMContentLoaded',function(){document.head.appendChild(st);});}}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: FORCE_DARK_SCRIPT }} />
        <meta name="color-scheme" content="dark" />
        <meta name="theme-color" content="#0B0B1A" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-full flex flex-col text-zinc-100`}
        style={{ backgroundColor: '#0B0B1A', minHeight: '100vh', margin: 0 }}
      >{children}</body>
    </html>
  );
}