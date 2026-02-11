import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Usman Saqlain — Senior Full-Stack Developer & AI Solutions Engineer",
  description:
    "12+ years building enterprise web applications with PHP, Drupal, Python & modern JavaScript frameworks. Specialized in cloud infrastructure, DevOps, and AI/ML automation.",
  keywords: [
    "Usman Saqlain",
    "Full-Stack Developer",
    "Drupal Developer",
    "AI Solutions Engineer",
    "PHP",
    "React",
    "AWS",
    "DevOps",
  ],
  openGraph: {
    title: "Usman Saqlain — Technical Profile",
    description:
      "Senior Full-Stack Developer & AI Solutions Engineer — 12+ years of enterprise experience.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
