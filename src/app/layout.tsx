import './styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from './components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import ThemeToggle from './components/theme-toggle'
import { SessionProvider } from "./components/providers/session-provider"
import { initializeDiscordBot } from '@/lib/discord-bot'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '[Your Server Name] Whitelist Application',
  description: 'Apply to join [Your Server] roleplay server',
}

if (typeof window === 'undefined') {
  initializeDiscordBot();
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SessionProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="min-h-screen bg-background text-foreground">
              <div>
                <header className="container mx-auto p-4">
                  <div className="flex justify-end">
                    <ThemeToggle />
                  </div>
                </header>
                {children}
              </div>
            </div>
            <Toaster />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}

