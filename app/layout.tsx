import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AudienceProvider, AudienceToggle } from "@/components/audience-toggle";
import { siteMetadata, navigationLinks } from "@/lib/core-data";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: siteMetadata.title,
  description: siteMetadata.description,
  keywords: siteMetadata.keywords,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AudienceProvider>
          <div className="min-h-screen flex flex-col">
            <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
              <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                  <div className="flex items-center">
                    <Link href="/" className="text-xl font-bold text-gray-900">
                      TMJ Revolutionary
                    </Link>
                  </div>
                  
                  <div className="hidden md:flex items-center space-x-8">
                    {navigationLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                  
                  <div className="flex items-center">
                    <AudienceToggle showLabels={true} />
                  </div>
                </div>
              </nav>
            </header>
            
            <main className="flex-grow">
              {children}
            </main>
            
            <footer className="bg-gray-900 text-white py-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-3 gap-8">
                  <div>
                    <h3 className="font-bold text-lg mb-4">Dr. Gerardo&apos;s Revolutionary Discovery</h3>
                    <p className="text-gray-400">40 years of practice leading to a paradigm shift in TMJ treatment.</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                      {navigationLinks.map((link) => (
                        <li key={link.href}>
                          <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-4">Contact</h3>
                    <p className="text-gray-400">Ready to reset your nervous system?</p>
                    <Link href="/contact" className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Get Started
                    </Link>
                  </div>
                </div>
                <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
                  <p>&copy; 2024 Dr. Gerardo. All rights reserved.</p>
                </div>
              </div>
            </footer>
          </div>
        </AudienceProvider>
      </body>
    </html>
  );
}
