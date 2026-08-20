'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { useLinesReveal } from '@/lib/use-lines-reveal'

// ⚠️ TEXTO PROVISÓRIO — rascunho para revisar com a Mara.
const COPY = {
  eyebrow: 'Terapia Capilar',
  headline: 'beleza em cada fio',
  support:
    'Diagnóstico, tratamento e acompanhamento para devolver saúde, força e movimento ao seu cabelo.',
  scrollCue: 'Role',
}

export function Hero() {
  const root = useRef<HTMLElement>(null)
  const headline = useLinesReveal<HTMLHeadingElement>({ immediate: true, delay: 0.35, stagger: 0.1 })

  useGSAP(
    () => {
      // Entrada: a foto abre num zoom lento enquanto o texto sobe.
      gsap.from('[data-hero-img]', { scale: 1.14, duration: 2.2, ease: 'power3.out' })
      gsap.from('[data-hero-media]', { opacity: 0, duration: 1.6, ease: 'power2.out' })
      gsap.from('[data-hero-fade]', {
        y: 24,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
        stagger: 0.15,
        delay: 0.2,
      })

      // Saída: a foto se dissolve no rosa chapado do fundo — como o fundo do
      // estúdio na foto é a mesma cor, ela parece derreter na página.
      gsap
        .timeline({
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: 'bottom 30%',
            scrub: true,
          },
        })
        .to('[data-hero-media]', { opacity: 0, scale: 1.06, ease: 'none' }, 0)
        .to('[data-hero-copy]', { yPercent: -22, opacity: 0, ease: 'none' }, 0)
        .to('[data-hero-cue]', { opacity: 0, ease: 'none', duration: 0.25 }, 0)
    },
    { scope: root },
  )

  return (
    <section
      id="inicio"
      ref={root}
      className="relative flex min-h-[100svh] flex-col overflow-hidden wide:block"
    >
      <div
        data-hero-copy
        className="relative z-10 px-5 pt-[5.5rem] pb-6 wide:flex wide:min-h-[100svh] wide:flex-col wide:justify-center wide:px-10 wide:pt-0 wide:pb-0"
      >
        <p data-hero-fade className="eyebrow text-ink/75">
          {COPY.eyebrow}
        </p>

        <h1
          ref={headline}
          className="mt-4 max-w-[9ch] font-display text-[3.9rem] leading-[0.92] font-light tracking-[-0.01em] text-ink tall-md:text-[6rem] wide:mt-6 wide:max-w-[8ch] wide:text-[7.5rem] wide-lg:text-[9rem]"
        >
          {COPY.headline}
        </h1>

        <p
          data-hero-fade
          className="mt-6 max-w-[32ch] text-base leading-relaxed text-ink/90 tall-md:mt-8 tall-md:max-w-[40ch] tall-md:text-lg wide:mt-8 wide:max-w-[34ch] wide:text-lg"
        >
          {COPY.support}
        </p>
      </div>

      <div
        data-hero-media
        className="hero-feather relative min-h-[58svh] flex-1 tall-md:min-h-[62svh] wide:absolute wide:inset-0 wide:min-h-0"
      >
        {/* `absolute inset-0` e não `h-full`: a altura do pai vem do `flex-1`,
            e altura em % contra um pai sem `height` explícito colapsa para zero
            no Safari — era o que fazia a foto sumir no celular e no tablet. */}
        <div data-hero-img className="absolute inset-0">
          <Image
            src="/mara-hero.png"
            alt="Mara sorrindo, segurando um secador rosa, sobre fundo rosado de estúdio"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[50%_26%] wide:object-[54%_50%]"
          />
        </div>
      </div>

      {/* Fica à esquerda, sobre a área lisa do fundo — no centro cairia em cima
          da roupa escura dela e sumiria. */}
      <div
        data-hero-cue
        className="absolute bottom-10 left-10 z-10 hidden items-center gap-4 wide:flex"
      >
        <span className="relative block h-px w-14 overflow-hidden bg-ink/20">
          <span className="absolute inset-y-0 left-0 w-1/2 animate-[cue_2.4s_ease-in-out_infinite] bg-ink/55" />
        </span>
        <span className="eyebrow text-ink/65">{COPY.scrollCue}</span>
      </div>
    </section>
  )
}
