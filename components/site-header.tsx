'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { services } from '@/lib/services'
import { MENSAGEM_GERAL, WHATSAPP_DISPLAY, whatsappLink } from '@/lib/whatsapp'

const navLinks = [
  { label: 'Início', href: '#inicio' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Trabalhos', href: '#trabalhos' },
  { label: 'Perguntas', href: '#perguntas' },
  { label: 'Contato', href: '#contato' },
]

export function SiteHeader() {
  const root = useRef<HTMLDivElement>(null)
  const overlay = useRef<HTMLDivElement>(null)
  const timeline = useRef<gsap.core.Timeline | null>(null)
  const [open, setOpen] = useState(false)

  useGSAP(
    () => {
      const style = getComputedStyle(document.documentElement)
      const cream = style.getPropertyValue('--cream').trim()

      // Fundo embaçado do cabeçalho: some no topo da página (onde a Hero já é
      // lisa) e aparece assim que o conteúdo começa a passar por trás.
      gsap.set('[data-header-bg]', { opacity: 0 })
      ScrollTrigger.create({
        start: 'top -72',
        onToggle: (self) =>
          gsap.to('[data-header-bg]', {
            opacity: self.isActive ? 1 : 0,
            duration: 0.45,
            ease: 'power2.out',
          }),
      })

      timeline.current = gsap
        .timeline({ paused: true, defaults: { ease: 'power3.inOut' } })
        .set(overlay.current, { pointerEvents: 'auto' })
        .to(overlay.current, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.85 }, 0)
        .to('[data-header-ink]', { color: cream, duration: 0.4 }, 0.1)
        .to('[data-bar]', { backgroundColor: cream, duration: 0.4 }, 0.1)
        .to('[data-bar="top"]', { y: 5, rotate: 45, duration: 0.45 }, 0.1)
        .to('[data-bar="middle"]', { opacity: 0, duration: 0.2 }, 0.1)
        .to('[data-bar="bottom"]', { y: -5, rotate: -45, duration: 0.45 }, 0.1)
        .from(
          '[data-menu-item]',
          { yPercent: 120, opacity: 0, duration: 0.8, stagger: 0.045, ease: 'power3.out' },
          0.3,
        )
    },
    { scope: root },
  )

  useGSAP(
    () => {
      if (!timeline.current) return
      if (open) timeline.current.play()
      else timeline.current.reverse()
    },
    { dependencies: [open] },
  )

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  function goTo(href: string) {
    setOpen(false)
    gsap.to(window, {
      duration: 1.1,
      ease: 'power3.inOut',
      // Desconta a altura do cabeçalho fixo para o título da seção não ficar atrás dele.
      scrollTo: { y: href, offsetY: window.innerWidth >= 768 ? 96 : 80, autoKill: true },
    })
  }

  return (
    <div ref={root}>
      <header className="fixed inset-x-0 top-0 z-50">
        <div
          data-header-bg
          className="absolute inset-0 border-b border-ink/8 bg-cream/55 backdrop-blur-xl"
        />

        <div className="relative flex h-16 items-center justify-between px-5 md:h-20 md:px-10">
          <a
            href="#inicio"
            onClick={(e) => {
              e.preventDefault()
              goTo('#inicio')
            }}
            data-header-ink
            className="font-display text-2xl leading-none tracking-[0.02em] text-ink md:text-[1.75rem]"
          >
            Mara<span className="font-light italic">Hair</span>
          </a>

          <div className="flex items-center gap-5 md:gap-8">
            {/* Sem função por enquanto — aguardando o link de agendamento da Mara. */}
            <button
              type="button"
              data-header-ink
              className="eyebrow relative text-ink after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-500 hover:after:origin-left hover:after:scale-x-100"
            >
              Marcar Horário
            </button>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              className="-mr-2 flex h-11 w-11 flex-col items-center justify-center gap-[5px] p-2"
            >
              <span data-bar="top" className="block h-px w-6 bg-ink" />
              <span data-bar="middle" className="block h-px w-6 bg-ink" />
              <span data-bar="bottom" className="block h-px w-6 bg-ink" />
            </button>
          </div>
        </div>
      </header>

      <div
        ref={overlay}
        className="fixed inset-0 z-40 overflow-y-auto bg-ink text-cream"
        style={{ clipPath: 'inset(0% 0% 100% 0%)', pointerEvents: 'none' }}
      >
        <div className="flex min-h-full flex-col justify-between px-5 pt-28 pb-10 md:px-10 md:pt-32 md:pb-12">
          <div className="grid gap-12 md:grid-cols-[1fr_1fr] md:gap-16">
            <nav>
              <ul>
                {navLinks.map((link) => (
                  <li key={link.href} className="overflow-hidden">
                    <a
                      data-menu-item
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault()
                        goTo(link.href)
                      }}
                      className="block py-1 font-display text-[3rem] leading-[1.15] font-light text-cream md:text-6xl"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="md:pt-4">
              <p className="eyebrow overflow-hidden text-cream/70">
                <span data-menu-item className="block">
                  Serviços
                </span>
              </p>
              <ul className="mt-5 space-y-3 md:mt-7 md:space-y-4">
                {services.map((service) => (
                  <li key={service.number} className="overflow-hidden">
                    <a
                      data-menu-item
                      href="#servicos"
                      onClick={(e) => {
                        e.preventDefault()
                        goTo('#servicos')
                      }}
                      className="flex items-baseline gap-4 text-cream/85 transition-colors duration-300 hover:text-cream"
                    >
                      <span className="text-[0.7rem] tracking-[0.2em] text-cream/70">
                        {service.number}
                      </span>
                      <span className="font-display text-[1.35rem] font-light md:text-2xl">
                        {service.title}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-14 flex flex-col gap-4 border-t border-cream/15 pt-6 text-base font-light text-cream/85 sm:flex-row sm:items-center sm:justify-between">
            <span className="block overflow-hidden">
              <a
                data-menu-item
                href={whatsappLink(MENSAGEM_GERAL)}
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-colors duration-300 hover:text-cream"
              >
                {WHATSAPP_DISPLAY}
              </a>
            </span>
            <span className="block overflow-hidden">
              <a
                data-menu-item
                href="https://www.instagram.com/marasantosterapeutacapilar"
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-colors duration-300 hover:text-cream"
              >
                @marasantosterapeutacapilar
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
