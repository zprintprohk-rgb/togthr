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

// Next.js 15 requires colorScheme + themeColor in viewport export, not metadata.
export const viewport: Viewport = {
  // Force browser UA UI (scrollbar, form inputs, etc.) to dark scheme, AND
  // discourage Chrome/Edge "Auto Apply Dark Mode to light-themed websites"
  // from running on top of our explicit .dark class. Without this, Edge
  // InPrivate + some UA dark themes have been observed silently stripping
  // the dark className from <html>, leaving a white page in spite of SSR.
  colorScheme: 'dark',
  themeColor: '#0B0B1A',
};

export const metadata: Metadata = {
  title: "Togthr",
  description: "Your private space, built for two",
};

const FORCE_DARK_SCRIPT = `(function(){try{var d=document.documentElement;d.classList.add('dark');var s=d.style;s.colorScheme='dark';s.backgroundColor='#0B0B1A';}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      // suppressHydrationWarning: <html> is modified by FORCE_DARK_SCRIPT
      // (above-the-fold inline) and Tailwind v4 dark variant CSS — className
      // mismatch between SSR and CSR is expected, not a real error.
      suppressHydrationWarning
    >
      <head>
        {/* Belt + suspenders: re-assert dark on every page load BEFORE first paint.
            Runs synchronously in <head> so any layout/theme-detection in body comes
            after we own documentElement. */}
        <script dangerouslySetInnerHTML={{ __html: FORCE_DARK_SCRIPT }} />
      </head>
      <body 
        className="min-h-full flex flex-col bg-zinc-950 text-zinc-100"
        style={{ backgroundColor: '#0B0B1A', margin: 0 }}
      >{children}</body>
    </html>
  );
}