'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { useLinesReveal } from '@/lib/use-lines-reveal'

// ⚠️ TEXTO PROVISÓRIO — rascunho para revisar com a Mara.
const COPY = {
  quote: '“O cabelo é a moldura do rosto — e a saúde dele começa muito antes do espelho.”',
  attribution: 'Mara',
  role: 'Terapeuta capilar',
}

export function QuoteSection() {
  const root = useRef<HTMLElement>(null)
  const quote = useLinesReveal<HTMLParagraphElement>({ stagger: 0.1 })

  useGSAP(
    () => {
      gsap.from('[data-quote-mark]', {
        scaleX: 0,
        duration: 1.2,
        ease: 'power3.inOut',
        scrollTrigger: { trigger: '[data-quote-mark]', start: 'top 88%', once: true },
      })
      gsap.from('[data-quote-author]', {
        y: 18,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: { trigger: '[data-quote-author]', start: 'top 92%', once: true },
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} className="px-5 py-[18svh] md:px-10 md:py-[26svh]">
      <div className="mx-auto max-w-4xl text-center">
        <p
          ref={quote}
          className="font-display text-[2rem] leading-[1.15] font-light text-balance text-ink md:text-[3.4rem] lg:text-[4rem]"
        >
          {COPY.quote}
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 md:mt-14">
          <span data-quote-mark className="block h-px w-16 origin-center bg-ink/25" />
          <p data-quote-author className="eyebrow text-ink/60">
            {COPY.attribution}
          </p>
          <p data-quote-author className="-mt-2 text-xs font-light text-ink/40">
            {COPY.role}
          </p>
        </div>
      </div>
    </section>
  )
}
