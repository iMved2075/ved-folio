import { Geist_Mono } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({ subsets: ["latin"]});

export const metadata = {
  title: "Vedprakash Patel — MERN Developer",
  description: "Portfolio of Vedprakash Patel: MERN projects, skills, and contact.",
  openGraph: {
    title: "Vedprakash Patel — MERN Developer",
    description: "Portfolio of Vedprakash Patel: MERN projects, skills, and contact.",
    url: "https://example.com",
    siteName: "Ved Portfolio",
    images: [
      { url: "/bg1.jpg", width: 1200, height: 630, alt: "Ved Portfolio" }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vedprakash Patel — MERN Developer",
    description: "Portfolio of Vedprakash Patel: MERN projects, skills, and contact.",
    images: ["/bg1.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="no-scrollbar light" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body
        className= {`${geistMono.className}`}
      >
        {/* Set initial theme before React loads to avoid FOUC */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            try {
              var stored = localStorage.getItem('theme');
              var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
              var theme = stored || (prefersDark ? 'dark' : 'light');
              var html = document.documentElement;
              html.classList.remove('light','dark');
              html.classList.add(theme);
              var meta = document.querySelector('meta[name="theme-color"]');
              if (meta) meta.setAttribute('content', theme === 'dark' ? '#0a0a0a' : '#ffffff');
            } catch (e) {}
          })();
        `}} />
        {/* Plausible Analytics */}
        <script defer data-domain="example.com" src="https://plausible.io/js/script.js"></script>
        {children}
      </body>
    </html>
  );
}
