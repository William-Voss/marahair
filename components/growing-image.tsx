'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'

// ⚠️ TEXTO PROVISÓRIO — rascunho para revisar com a Mara.
const COPY = {
  heading: 'seu momento começa aqui',
  body: 'Um tempo só seu, com um plano de cuidado desenhado para o seu cabelo — do diagnóstico à finalização.',
  cta: 'Falar com a Mara',
}

export function GrowingImage() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(
        {
          mobile: '(max-width: 767px)',
          desktop: '(min-width: 768px)',
          motion: '(prefers-reduced-motion: no-preference)',
          reduced: '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          const { mobile, reduced } = context.conditions as Record<string, boolean>

          // Sem animação: mostra o quadro já aberto.
          if (reduced) {
            gsap.set('[data-frame]', { clipPath: 'inset(0%)' })
            return
          }

          const closed = mobile
            ? 'inset(30% 18% 30% 18%)'
            : 'inset(24% 37% 24% 37%)'

          gsap
            .timeline({
              scrollTrigger: {
                trigger: root.current,
                start: 'top top',
                end: mobile ? '+=130%' : '+=170%',
                pin: true,
                scrub: true,
                anticipatePin: 1,
              },
            })
            .fromTo(
              '[data-frame]',
              { clipPath: closed },
              { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', duration: 1 },
              0,
            )
            // No celular o zoom de entrada é menor: a foto já está sendo ampliada
            // muito para preencher a tela em pé, e 1.35 piorava a nitidez à toa.
            .fromTo(
              '[data-frame-inner]',
              { scale: mobile ? 1.12 : 1.35 },
              { scale: 1, ease: 'none', duration: 1 },
              0,
            )
            .from(
              '[data-frame-copy]',
              { y: 34, opacity: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out' },
              0.55,
            )
        },
      )
    },
    { scope: root },
  )

  return (
    <section ref={root} className="relative h-[100svh] w-full overflow-hidden">
      <div data-frame className="absolute inset-0">
        <div data-frame-inner className="absolute inset-0">
          <Image
            src="/mara-retrato.png"
            alt="Mara de avental de couro, com pente e tesoura, olhando para baixo"
            fill
            /* A foto é deitada e aqui aparece numa caixa em pé, então o
               `object-cover` amplia muito: a caixa real no celular é bem mais
               larga que a tela. `100vw` fazia o Next servir uma versão menor que o
               próprio arquivo — pedindo mais, ele entrega a origem inteira. */
            sizes="(max-width: 767px) 170vw, 100vw"
            quality={90}
            className="object-cover"
          />
        </div>

        {/* A foto tem fundo claro, então nada de véu por cima dela toda: no celular
            escurece só o pé e no desktop só a esquerda, que é onde o fundo do
            estúdio está vazio e onde o texto se apoia. */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/75 via-black/35 to-transparent md:hidden" />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-black/70 via-black/30 to-transparent md:block" />

        <div className="absolute inset-0 flex flex-col justify-end p-6 md:justify-center md:p-14 lg:p-20">
          <h2
            data-frame-copy
            className="max-w-[12ch] font-display text-[3rem] leading-[1.02] font-light text-cream md:max-w-[10ch] md:text-[4.8rem] lg:text-[5.8rem]"
          >
            {COPY.heading}
          </h2>
          <p
            data-frame-copy
            className="mt-4 max-w-[36ch] text-base leading-relaxed text-cream/90 md:mt-6 md:max-w-[34ch] md:text-lg"
          >
            {COPY.body}
          </p>
          <a
            data-frame-copy
            href="#contato"
            className="group relative mt-8 self-start overflow-hidden border border-cream/40 px-8 py-4 md:mt-10"
          >
            <span className="absolute inset-0 origin-bottom scale-y-0 bg-cream transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-y-100" />
            <span className="eyebrow relative text-cream transition-colors duration-500 group-hover:text-ink">
              {COPY.cta}
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
