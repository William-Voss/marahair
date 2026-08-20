'use client'

import { useRef, useState } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { useLinesReveal } from '@/lib/use-lines-reveal'
import { MENSAGEM_GERAL, whatsappLink } from '@/lib/whatsapp'

// ⚠️ TEXTO PROVISÓRIO — rascunho para revisar com a Mara.
// Os campos entre colchetes precisam ser preenchidos com os dados reais.
const COPY = {
  eyebrow: 'Perguntas',
  heading: 'dúvidas frequentes',
  footNote: 'Não encontrou a sua pergunta? Manda uma mensagem — a gente responde.',
  footCta: 'Chamar no WhatsApp',
}

const questions = [
  {
    question: 'Quais formas de pagamento vocês aceitam?',
    answer: [
      'Aceitamos [FORMAS DE PAGAMENTO AQUI]. Para o atendimento fluir melhor, damos preferência a Pix e cartão.',
    ],
  },
  {
    question: 'Onde fica o espaço e quais são os horários?',
    answer: [
      '[ENDEREÇO AQUI]. O atendimento acontece [DIAS E HORÁRIOS AQUI], sempre com horário marcado — assim cada cliente tem o tempo que o tratamento pede.',
    ],
  },
  {
    question: 'Por que a terapia capilar custa mais que uma hidratação comum?',
    answer: [
      'Porque não é a mesma coisa. Antes de qualquer produto entrar no seu cabelo existe uma avaliação do couro cabeludo e da fibra, e o protocolo é montado a partir do que foi encontrado ali.',
      'Os produtos são escolhidos por composição, não por promessa de embalagem — e a sessão tem o tempo necessário, sem correria entre um cliente e outro.',
    ],
  },
  {
    question: 'É a minha primeira vez. O que eu preciso saber?',
    answer: [
      'Venha com o cabelo do jeito que ele está no dia a dia: isso ajuda no diagnóstico mais do que um cabelo recém-lavado.',
      'A primeira sessão é mais longa, porque inclui a avaliação e a conversa sobre a sua rotina.',
      'Se você usa alguma medicação ou fez química recente, avise antes — isso muda o protocolo.',
    ],
  },
  {
    question: 'Como faço para agendar?',
    answer: [
      'O agendamento é pelo WhatsApp, no botão aqui embaixo. Conte o que está acontecendo com o seu cabelo e a gente indica qual atendimento faz sentido para começar.',
    ],
  },
]

export function Faq() {
  const root = useRef<HTMLElement>(null)
  const heading = useLinesReveal<HTMLHeadingElement>({ stagger: 0.1 })
  const [open, setOpen] = useState<number | null>(null)

  useGSAP(
    () => {
      gsap.set('[data-faq-row]', { opacity: 0, y: 28 })
      ScrollTrigger.batch('[data-faq-row]', {
        start: 'top 90%',
        onEnter: (rows) =>
          gsap.to(rows, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.08,
            overwrite: true,
          }),
      })
    },
    { scope: root },
  )

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>('[data-faq-panel]').forEach((panel, i) => {
        const isOpen = i === open
        gsap.to(panel, {
          height: isOpen ? 'auto' : 0,
          duration: 0.65,
          ease: 'power3.inOut',
          overwrite: true,
          // A altura das respostas muda a posição do rodapé; sem isso os
          // ScrollTriggers seguintes ficam calculados na posição antiga.
          onComplete: () => ScrollTrigger.refresh(),
        })
        gsap.to(panel.parentElement?.querySelector('[data-faq-icon]') ?? null, {
          rotate: isOpen ? 45 : 0,
          duration: 0.5,
          ease: 'power3.inOut',
          overwrite: true,
        })
      })
    },
    { dependencies: [open], scope: root },
  )

  return (
    <section id="perguntas" ref={root} className="px-5 pb-[12svh] md:px-10 md:pb-[16svh]">
      <div className="mx-auto max-w-4xl pt-[12svh] md:pt-[18svh]">
        <p className="eyebrow text-ink/65">{COPY.eyebrow}</p>
        <h2
          ref={heading}
          className="mt-5 font-display text-[2.8rem] leading-[1.02] font-light text-ink md:text-[4.3rem]"
        >
          {COPY.heading}
        </h2>

        <div className="mt-12 border-t border-ink/20 md:mt-16">
          {questions.map((item, i) => (
            <div key={item.question} data-faq-row className="border-b border-ink/20">
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                className="flex w-full items-start justify-between gap-6 py-6 text-left"
              >
                <span className="font-display text-[1.45rem] leading-snug font-normal text-ink md:text-[1.75rem]">
                  {item.question}
                </span>
                <span className="relative mt-1.5 block h-3.5 w-3.5 shrink-0">
                  <span data-faq-icon className="absolute inset-0 block">
                    <span className="absolute top-1/2 left-0 block h-px w-full -translate-y-1/2 bg-ink/75" />
                    <span className="absolute top-0 left-1/2 block h-full w-px -translate-x-1/2 bg-ink/75" />
                  </span>
                </span>
              </button>

              <div data-faq-panel className="h-0 overflow-hidden">
                <div className="max-w-[62ch] space-y-3 pr-4 pb-7 text-base leading-relaxed text-ink/90 md:pr-10">
                  {item.answer.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[42ch] text-base text-ink/85">{COPY.footNote}</p>
          <a
            href={whatsappLink(MENSAGEM_GERAL)}
            target="_blank"
            rel="noopener noreferrer"
            className="eyebrow relative self-start text-ink after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-500 hover:after:origin-left hover:after:scale-x-100"
          >
            {COPY.footCta}
          </a>
        </div>
      </div>
    </section>
  )
}
