'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { useLinesReveal } from '@/lib/use-lines-reveal'
import {
  MENSAGEM_GERAL,
  WHATSAPP_DISPLAY,
  WHATSAPP_NUMERO,
  whatsappLink,
} from '@/lib/whatsapp'

// ⚠️ DADOS PROVISÓRIOS — tudo entre colchetes precisa ser trocado pelos dados reais da Mara.
const COPY = {
  finalCta: 'Explore cada detalhe da MaraHair',
  navTitle: 'Navegação',
  contactTitle: 'Contato',
  followTitle: 'Siga',
  address: '[ENDEREÇO AQUI]',
  hours: '[DIAS E HORÁRIOS AQUI]',
  copyright: '© 2026 MaraHair. Todos os direitos reservados.',
  credit: 'Site desenvolvido por [SEU ESTÚDIO]',
}

const navLinks = [
  { label: 'Início', href: '#inicio' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Trabalhos', href: '#trabalhos' },
  { label: 'Perguntas', href: '#perguntas' },
]

const contactLinks = [
  {
    label: 'Agendar pelo WhatsApp',
    value: WHATSAPP_DISPLAY,
    href: whatsappLink(MENSAGEM_GERAL),
  },
  {
    label: 'Falar por telefone',
    value: WHATSAPP_DISPLAY,
    href: `tel:+${WHATSAPP_NUMERO}`,
  },
]

const socialLinks = [
  {
    label: 'Instagram',
    value: '@marasantosterapeutacapilar',
    href: 'https://www.instagram.com/marasantosterapeutacapilar',
    icon: InstagramIcon,
  },
  { label: 'Facebook', value: '[FACEBOOK AQUI]', href: undefined, icon: FacebookIcon },
]

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />
    </svg>
  )
}

export function SiteFooter() {
  const root = useRef<HTMLElement>(null)
  const finalCta = useLinesReveal<HTMLAnchorElement>({ stagger: 0.1 })

  useGSAP(
    () => {
      gsap.from('[data-footer-col]', {
        y: 24,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: { trigger: '[data-footer-col]', start: 'top 92%', once: true },
      })

      gsap.from('[data-footer-wordmark]', {
        yPercent: 26,
        opacity: 0,
        duration: 1.4,
        ease: 'power3.out',
        scrollTrigger: { trigger: '[data-footer-wordmark]', start: 'top 98%', once: true },
      })
    },
    { scope: root },
  )

  return (
    <footer id="contato" ref={root} className="border-t border-ink/10 px-5 pt-[10svh] md:px-10">
      <div className="mx-auto max-w-6xl">
        <a
          ref={finalCta}
          href="#servicos"
          className="block max-w-[16ch] font-display text-[2.4rem] leading-[1.02] font-light text-ink transition-opacity duration-500 hover:opacity-60 md:max-w-[20ch] md:text-[4.5rem] lg:text-[5.5rem]"
        >
          {COPY.finalCta}
        </a>

        <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 md:mt-24 md:grid-cols-4">
          <div data-footer-col>
            <p className="eyebrow text-ink/40">{COPY.navTitle}</p>
            <ul className="mt-5 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm font-light text-ink/70 transition-colors duration-300 hover:text-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div data-footer-col>
            <p className="eyebrow text-ink/40">{COPY.contactTitle}</p>
            <ul className="mt-5 space-y-4">
              {contactLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group/link block"
                  >
                    <p className="text-sm font-light text-ink/70 transition-colors duration-300 group-hover/link:text-ink">
                      {link.label}
                    </p>
                    <p className="mt-0.5 text-sm font-light text-ink/40">{link.value}</p>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div data-footer-col>
            <p className="eyebrow text-ink/40">{COPY.followTitle}</p>
            <ul className="mt-5 space-y-4">
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                  <li key={link.label}>
                    {link.href ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 transition-opacity duration-300 hover:opacity-60"
                      >
                        <Icon className="h-4 w-4 text-ink/60" />
                        <div>
                          <p className="text-sm font-light text-ink/70">{link.label}</p>
                          <p className="mt-0.5 text-sm font-light text-ink/40">{link.value}</p>
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-center gap-3">
                        <Icon className="h-4 w-4 text-ink/60" />
                        <div>
                          <p className="text-sm font-light text-ink/70">{link.label}</p>
                          <p className="mt-0.5 text-sm font-light text-ink/40">{link.value}</p>
                        </div>
                      </div>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>

          <div data-footer-col>
            <p className="eyebrow text-ink/40">Onde / Quando</p>
            <address className="mt-5 space-y-3 text-sm leading-relaxed font-light text-ink/70 not-italic">
              <p>{COPY.address}</p>
              <p className="text-ink/40">{COPY.hours}</p>
            </address>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-ink/10 py-8 text-xs font-light text-ink/40 sm:flex-row sm:items-center sm:justify-between md:mt-24">
          <p>{COPY.copyright}</p>
          <p>{COPY.credit}</p>
        </div>
      </div>

      {/* Assinatura tipográfica fechando a página. */}
      <div className="overflow-hidden">
        <p
          data-footer-wordmark
          className="text-center font-display text-[23vw] leading-[0.82] font-light tracking-[-0.02em] text-ink/12 select-none"
        >
          Mara<span className="italic">Hair</span>
        </p>
      </div>
    </footer>
  )
}
