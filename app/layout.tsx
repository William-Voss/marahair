import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Jost } from 'next/font/google'
import { SiteHeader } from '@/components/site-header'
import { ScrollBackground } from '@/components/scroll-background'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-jost',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'MaraHair — Terapia Capilar',
  description:
    'Terapia capilar com diagnóstico, tratamento e acompanhamento. Cada fio cuidado com técnica, ciência e presença.',
}

export const viewport: Viewport = {
  themeColor: '#d6bbaf',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${jost.variable}`}>
      <body>
        <ScrollBackground />
        <SiteHeader />
        {children}
        <div aria-hidden className="grain" />
      </body>
    </html>
  )
}
