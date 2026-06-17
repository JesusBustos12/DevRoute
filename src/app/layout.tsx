import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/context/ThemeContext';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DevRoute - Tu ruta hacia el Desarrollo Web y la IA',
  description:
    'Descubre qué aprender y en qué orden. Plataforma de cursos de programación y desarrollo web con asistente de IA integrado por Víctor Robles.',
  keywords: [
    'desarrollo web',
    'programación',
    'cursos',
    'IA',
    'inteligencia artificial',
    'React',
    'JavaScript',
    'Node.js',
  ],
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🤖</text></svg>',
  },
  openGraph: {
    title: 'DevRoute - Tu ruta hacia el Desarrollo Web y la IA',
    description: 'Descubre qué aprender y en qué orden. Plataforma de cursos de programación y desarrollo web con asistente de IA.',
    url: 'https://devroute-portfolio.vercel.app',
    siteName: 'DevRoute',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevRoute - Tu ruta hacia el Desarrollo Web y la IA',
    description: 'Descubre qué aprender y en qué orden con DevRoute.',
  },
  alternates: {
    canonical: 'https://devroute-portfolio.vercel.app',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" data-theme="dark" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
