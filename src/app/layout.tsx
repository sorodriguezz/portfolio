import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";
import "./globals.css";

// Runs before paint to apply the saved theme (default: dark) and avoid a flash.
const themeScript = `
(function () {
  try {
    var t = localStorage.getItem('theme');
    if (t !== 'light' && t !== 'dark') t = 'dark';
    var d = document.documentElement;
    d.classList.remove('light', 'dark');
    d.classList.add(t);
    d.style.colorScheme = t;
  } catch (e) {
    document.documentElement.classList.add('dark');
  }
})();
`;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "sorodriguezz | Software Engineer",
  description:
    "Portafolio profesional de Sebastián Rodríguez Zapata — Ingeniero de Software orientado a la arquitectura de software, especializado en sistemas distribuidos, microservicios y soluciones cloud-native.",
  keywords: [
    "Software Engineer",
    "Software Architecture",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "Microservices",
    "Cloud Native",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
