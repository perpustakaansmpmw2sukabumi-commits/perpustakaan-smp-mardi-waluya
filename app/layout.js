import './globals.css';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Perpustakaan Digital Premium - SMP Mardi Waluya 2',
  description: 'Sistem Perpustakaan Digital Terlengkap SMP Mardi Waluya 2 Kota Sukabumi'
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          <Header />
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
          <Toaster position="top-right" />
        </div>
      </body>
    </html>
  );
}
