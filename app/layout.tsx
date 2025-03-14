import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { ContactsProvider } from "@/contexts/contactsCtx";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <Link href="/" className="text-xl font-bold text-gray-800 hover:text-blue-600">
                        ContactsApp
                    </Link>

                    <ul className="flex space-x-6">
                        <li>
                            <Link 
                                href="/" 
                                className="text-gray-600 hover:text-blue-600 font-medium transition duration-300"
                            >
                                New Contact
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href="/contacts" 
                                className="text-gray-600 hover:text-blue-600 font-medium transition duration-300"
                            >
                                Contact List
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <ContactsProvider>
          {children}
        </ContactsProvider>
      </body>
    </html>
  );
}
