'use client';

import { ThemeProvider } from '@/components/ThemeProvider';
import { LanguageProvider } from '@/lib/language';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        {children}
      </ThemeProvider>
    </LanguageProvider>
  );
}
