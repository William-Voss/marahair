import { Hero } from '@/components/hero'
import { QuoteSection } from '@/components/quote-section'
import { WorksStatement } from '@/components/works-statement'
import { TherapistServices } from '@/components/therapist-services'
import { GrowingImage } from '@/components/growing-image'
import { Faq } from '@/components/faq'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  return (
    <main className="relative">
      <Hero />
      <QuoteSection />
      <WorksStatement />

      {/* Marca onde o fundo rosa começa a virar creme — lido por <ScrollBackground />. */}
      <div id="bg-to-cream" aria-hidden className="h-px w-full" />

      <TherapistServices />
      <GrowingImage />
      <Faq />
      <SiteFooter />
    </main>
  )
}
