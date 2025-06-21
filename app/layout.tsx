import './globals.css';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'AMRR TechSols - Item Management',
  description: 'Internship assignment for AMRR TechSols',
};

export default function RootLayout({ children }:{children:any}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}