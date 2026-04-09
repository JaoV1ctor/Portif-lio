import type {Metadata} from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import Header from '@/components/Header';

const poppins = Poppins({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins' 
});

export const metadata: Metadata = {
  title: 'Vibe Portfolio | AI & Dev',
  description: 'Portfólio minimalista focado em IA, desenvolvimento e produtividade para freelancers.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-BR" className={`${poppins.variable} dark`}>
      <body className="font-poppins bg-background text-white" suppressHydrationWarning>
        <LanguageProvider>
          <Header />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
