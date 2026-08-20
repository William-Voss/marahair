'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { useLinesReveal } from '@/lib/use-lines-reveal'
import { services } from '@/lib/services'
import { mensagemServico, whatsappLink } from '@/lib/whatsapp'

// ⚠️ TEXTO PROVISÓRIO — rascunho para revisar com a Mara.
const COPY = {
  eyebrow: 'Serviços',
  heading: 'cuidado que começa no diagnóstico',
  body: 'Nada de pacote fechado. Depois de entender o seu couro cabeludo e o seu fio, montamos o protocolo — e explicamos cada etapa antes de começar.',
  portraitName: 'Mara',
  portraitRole: 'Terapeuta capilar',
}

// 🖼️ PROVISÓRIO: por enquanto os seis cards usam a mesma imagem de ferramentas.
// Para dar uma foto própria a um serviço, é só trocar o `src` da posição dele —
// a ordem é a mesma de `services`. Item em `null` volta ao gradiente de placeholder.
//
// O `alt` fica vazio de propósito: a imagem se repete e não acrescenta informação
// nenhuma ao título do card, então um leitor de tela anunciaria a mesma descrição
// seis vezes à toa. Quando cada serviço tiver a sua foto, escrever um alt de verdade.
const SERVICOS_PADRAO = '/servicos/servicos.jpg'

const cardImages: ({ src: string; alt: string } | null)[] = [
  { src: SERVICOS_PADRAO, alt: '' },
  { src: SERVICOS_PADRAO, alt: '' },
  { src: SERVICOS_PADRAO, alt: '' },
  { src: SERVICOS_PADRAO, alt: '' },
  { src: SERVICOS_PADRAO, alt: '' },
  { src: SERVICOS_PADRAO, alt: '' },
]

const cardTones = [
  ['#B79A8D', '#DCC8BE'],
  ['#8C6F63', '#B49485'],
  ['#E0D2CA', '#BFA396'],
  ['#6E574E', '#9C7E70'],
  ['#C9AEA1', '#E7DAD3'],
  ['#A38173', '#CDB2A6'],
]

export function TherapistServices() {
  const root = useRef<HTMLElement>(null)
  const heading = useLinesReveal<HTMLHeadingElement>({ stagger: 0.1 })

  useGSAP(
    () => {
      gsap.from('[data-services-body]', {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '[data-services-body]', start: 'top 90%', once: true },
      })

      // Retrato da Mara: abre de baixo para cima com a imagem assentando.
      gsap.set('[data-portrait]', { clipPath: 'inset(100% 0% 0% 0%)' })
      gsap.set('[data-portrait-inner]', { scale: 1.25 })
      const portrait = gsap.timeline({
        scrollTrigger: { trigger: '[data-portrait]', start: 'top 85%', once: true },
      })
      portrait
        .to('[data-portrait]', { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'power3.inOut' })
        .to('[data-portrait-inner]', { scale: 1, duration: 1.8, ease: 'power3.out' }, 0)
        .from('[data-portrait-label]', { y: 24, opacity: 0, duration: 0.9, ease: 'power3.out' }, 0.5)

      gsap.set('[data-service-card]', { opacity: 0, y: 40 })
      ScrollTrigger.batch('[data-service-card]', {
        start: 'top 88%',
        onEnter: (cards) =>
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: 'power3.out',
            stagger: 0.1,
            overwrite: true,
          }),
      })
    },
    { scope: root },
  )

  return (
    <section id="servicos" ref={root} className="px-5 pb-[12svh] md:px-10 md:pb-[18svh]">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div>
            <p className="eyebrow text-ink/45">{COPY.eyebrow}</p>
            <h2
              ref={heading}
              className="mt-5 font-display text-[2.4rem] leading-[1.02] font-light text-ink md:max-w-[14ch] md:text-[4rem] lg:text-[4.5rem]"
            >
              {COPY.heading}
            </h2>
          </div>
          <p
            data-services-body
            className="max-w-[42ch] text-sm leading-relaxed font-light text-ink/65 lg:pb-3 lg:text-right"
          >
            {COPY.body}
          </p>
        </div>

        {/* O 4:3 no desktop (em vez de 16:9) casa com a proporção nativa da foto,
            então ela entra inteira, sem corte. */}
        <div
          data-portrait
          className="relative mx-auto mt-14 aspect-[4/5] w-full max-w-3xl overflow-hidden ring-1 ring-ink/5 md:mt-20 md:aspect-[4/3]"
        >
          <div data-portrait-inner className="absolute inset-0">
            <Image
              src="/mara-retrato2.png"
              alt="Mara sorrindo, segurando duas tesouras de corte em direção à câmera"
              fill
              sizes="(max-width: 767px) 100vw, 768px"
              className="object-cover"
            />
          </div>

          {/* Escurece o pé para o nome dela ler sobre qualquer foto. */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          <div data-portrait-label className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
            <p className="font-display text-3xl leading-none font-light text-cream md:text-5xl">
              {COPY.portraitName}
            </p>
            <p className="eyebrow mt-3 text-cream/65">{COPY.portraitRole}</p>
          </div>
        </div>

        <div className="mt-14 grid gap-x-6 gap-y-12 md:mt-20 md:grid-cols-2 lg:grid-cols-3 lg:gap-y-16">
          {services.map((service, i) => (
            <article key={service.number} data-service-card className="group relative flex flex-col">
              <div
                className="relative aspect-[4/3] w-full overflow-hidden ring-1 ring-ink/5"
                style={
                  cardImages[i]
                    ? undefined
                    : {
                        background: `linear-gradient(150deg, ${cardTones[i][0]} 0%, ${cardTones[i][1]} 100%)`,
                      }
                }
              >
                {cardImages[i] ? (
                  <Image
                    src={cardImages[i]!.src}
                    alt={cardImages[i]!.alt}
                    fill
                    sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                ) : (
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'radial-gradient(80% 60% at 25% 20%, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0) 62%)',
                    }}
                  />
                )}
              </div>

              <div className="mt-5 flex items-baseline gap-3">
                <span className="text-[0.6rem] tracking-[0.2em] text-ink/35">{service.number}</span>
                <h3 className="font-display text-2xl leading-tight font-normal text-ink">
                  {service.title}
                </h3>
              </div>

              <p className="mt-3 text-sm leading-relaxed font-light text-ink/65">
                {service.description}
              </p>

              <ul className="mt-5 border-t border-ink/10">
                {service.treatments.map((treatment) => (
                  <li
                    key={treatment}
                    className="border-b border-ink/10 py-2.5 text-xs font-light tracking-wide text-ink/55"
                  >
                    {treatment}
                  </li>
                ))}
              </ul>

              {/* O `after:absolute after:inset-0` estica a área de clique deste link
                  por cima do card inteiro — alvo grande no celular — sem que o leitor
                  de tela leia a descrição e a lista toda como se fossem o nome do link. */}
              <a
                href={whatsappLink(mensagemServico(service.title))}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center gap-2 self-start pt-6 text-ink/70 transition-colors duration-300 group-hover:text-ink after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
              >
                <span className="eyebrow">Agendar pelo WhatsApp</span>
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
                <span className="sr-only">— {service.title}</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
