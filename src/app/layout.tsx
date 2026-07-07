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

const FORCE_DARK_SCRIPT = `(function(){try{var d=document.documentElement;d.className=(d.className||'')+' dark';var s=d.style;s.colorScheme='dark';s.backgroundColor='#0B0B1A';d.setAttribute('data-theme','dark');var b=document.body;if(b){b.setAttribute('bgcolor','#0B0B1A');b.setAttribute('text','#F4F4F5');b.setAttribute('link','#F472B6');b.setAttribute('vlink','#A78BFA');}}catch(e){var st=document.createElement('style');st.textContent='html,body{background:#0B0B1A!important;color-scheme:dark;}';if(document.head){document.head.appendChild(st);}else{document.addEventListener('DOMContentLoaded',function(){document.head.appendChild(st);});}}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* No-JS fallback: hard-code dark colors inline so even if FORCE_DARK_SCRIPT
            is blocked by CSP / Edge UA override, html/body still render dark. */}
        <style dangerouslySetInnerHTML={{ __html: `
          html, body { background-color: #0B0B1A !important; color: #F4F4F5 !important; color-scheme: dark !important; }
          html { background: #0B0B1A !important; }
          body { background: #0B0B1A !important; min-height: 100vh; margin: 0; }
        `}} />
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