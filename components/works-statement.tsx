'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { useLinesReveal } from '@/lib/use-lines-reveal'

// ⚠️ TEXTO PROVISÓRIO — rascunho para revisar com a Mara.
const COPY = {
  eyebrow: 'Sobre o método',
  // Empilhado em linhas curtas de propósito — a quebra é fixa, não depende da largura.
  headingLines: ['a arte do', 'cuidado', 'essencial'],
  body: 'Cada detalhe é pensado para realçar o que já é seu — sem promessa milagrosa e sem excesso. Só técnica, leitura do seu fio e um resultado que se sustenta no dia a dia.',
  cta: 'Marcar Horário',
}

/**
 * 🖼️ PLACEHOLDER: cada quadro é um campo de cor esperando a foto real. Para
 * trocar, pôr <Image src="..." alt="..." fill className="object-cover" /> no
 * lugar da div do gradiente.
 *
 * `top` é a posição inicial em % da altura da tela — acima de 100% o quadro
 * começa abaixo da dobra e só aparece quando sobe. `speed` é o quanto ele sobe
 * em relação ao scroll: 1 acompanha a página, acima disso passa correndo,
 * abaixo fica para trás. É essa diferença que dá a profundidade.
 */
type Box = { left: string; top: string; w: string; ar: string }

type Work = {
  number: string
  title: string
  /** Sem `src` o quadro fica no gradiente de placeholder. */
  src?: string
  alt?: string
  from: string
  to: string
  speed: number
  front: boolean
  /** Celular. */
  sm: Box
  /** Tela grande em pé (tablet): o `lg` em vw daria quadros minúsculos aqui. */
  md: Box
  /** Tela deitada, do tablet ao desktop. */
  lg: Box
}

const works: Work[] = [
  {
    number: '01',
    title: 'Corte em camadas',
    src: '/trabalhos/corte-em-camadas.jpg',
    alt: 'Cliente de óculos com cabelo castanho longo repicado, finalizado liso',
    from: '#4A3A33',
    to: '#7C6559',
    speed: 1.25,
    front: true,
    sm: { left: '2%', top: '40%', w: '44vw', ar: '4 / 5' },
    md: { left: '4%', top: '34%', w: '40vw', ar: '4 / 5' },
    lg: { left: '4%', top: '40%', w: 'max(20vw, 230px)', ar: '4 / 5' },
  },
  {
    number: '02',
    title: 'Loiro iluminado',
    src: '/trabalhos/loiro-iluminado.jpg',
    alt: 'Mara finalizando o cabelo loiro iluminado de uma cliente',
    from: '#F6F0EB',
    to: '#E0D0C6',
    speed: 0.75,
    front: false,
    sm: { left: '46%', top: '85%', w: '44vw', ar: '3 / 4' },
    md: { left: '52%', top: '80%', w: '40vw', ar: '3 / 4' },
    lg: { left: '17%', top: '90%', w: 'max(19vw, 215px)', ar: '3 / 4' },
  },
  {
    number: '03',
    title: 'Cachos definidos',
    src: '/trabalhos/cachos-definidos.png',
    alt: 'Cabelo escuro longo com ondas definidas e franja, finalização natural',
    from: '#5E483F',
    to: '#8E7264',
    speed: 1.15,
    front: true,
    sm: { left: '4%', top: '125%', w: '42vw', ar: '4 / 5' },
    md: { left: '6%', top: '122%', w: '40vw', ar: '4 / 5' },
    lg: { left: '60%', top: '60%', w: 'max(23vw, 260px)', ar: '4 / 5' },
  },
  {
    number: '04',
    title: 'Reconstrução',
    src: '/trabalhos/reconstrucao.jpg',
    alt: 'Cliente com cabelo ruivo longo, liso e com brilho após reconstrução',
    from: '#EFE7E1',
    to: '#D3C0B4',
    speed: 0.8,
    front: false,
    sm: { left: '50%', top: '145%', w: '42vw', ar: '3 / 4' },
    md: { left: '52%', top: '150%', w: '40vw', ar: '3 / 4' },
    lg: { left: '77%', top: '120%', w: 'max(18vw, 205px)', ar: '3 / 4' },
  },
  {
    number: '05',
    title: 'Bob alinhado',
    src: '/trabalhos/bob-alinhado.jpg',
    alt: 'Detalhe de cabelo castanho liso com corte alinhado nas pontas',
    from: '#8C6F63',
    to: '#B08E7E',
    speed: 0.95,
    front: false,
    sm: { left: '6%', top: '178%', w: '38vw', ar: '3 / 4' },
    md: { left: '8%', top: '182%', w: '38vw', ar: '3 / 4' },
    lg: { left: '6%', top: '155%', w: 'max(21vw, 240px)', ar: '4 / 5' },
  },
  {
    number: '06',
    title: 'Transição capilar',
    src: '/trabalhos/transicao-capilar.png',
    alt: 'Cabelo longo repicado com ondas soltas, visto de perfil',
    from: '#332823',
    to: '#5F4C43',
    speed: 1.15,
    front: true,
    sm: { left: '52%', top: '220%', w: '40vw', ar: '4 / 5' },
    md: { left: '50%', top: '218%', w: '40vw', ar: '4 / 5' },
    lg: { left: '64%', top: '190%', w: 'max(20vw, 225px)', ar: '3 / 4' },
  },
]

function Tile({ work }: { work: Work }) {
  return (
    <div
      data-rise
      data-speed={work.speed}
      className="absolute top-[var(--t-sm)] left-[var(--l-sm)] w-[var(--w-sm)] tall-md:top-[var(--t-md)] tall-md:left-[var(--l-md)] tall-md:w-[var(--w-md)] wide:top-[var(--t)] wide:left-[var(--l)] wide:w-[var(--w)]"
      style={
        {
          '--l-sm': work.sm.left,
          '--t-sm': work.sm.top,
          '--w-sm': work.sm.w,
          '--l-md': work.md.left,
          '--t-md': work.md.top,
          '--w-md': work.md.w,
          '--l': work.lg.left,
          '--t': work.lg.top,
          '--w': work.lg.w,
          '--ar-sm': work.sm.ar,
          '--ar-md': work.md.ar,
          '--ar': work.lg.ar,
        } as React.CSSProperties
      }
    >
      <div
        className="relative aspect-[var(--ar-sm)] w-full overflow-hidden ring-1 ring-ink/10 tall-md:aspect-[var(--ar-md)] wide:aspect-[var(--ar)]"
        style={
          work.src
            ? undefined
            : { background: `linear-gradient(155deg, ${work.from} 0%, ${work.to} 100%)` }
        }
      >
        {work.src ? (
          <Image
            src={work.src}
            alt={work.alt ?? work.title}
            fill
            sizes="(max-width: 767px) 46vw, (max-aspect-ratio: 4/3) 42vw, 26vw"
            className="object-cover"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(85% 60% at 30% 20%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 60%)',
            }}
          />
        )}
      </div>
    </div>
  )
}

export function WorksStatement() {
  const root = useRef<HTMLElement>(null)
  const heading = useLinesReveal<HTMLHeadingElement>({ stagger: 0.1 })
  const body = useLinesReveal<HTMLParagraphElement>({ start: 'top 88%', stagger: 0.05 })

  useGSAP(
    () => {
      gsap.from('[data-statement-fade]', {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: '[data-statement-fade]', start: 'top 92%', once: true },
      })

      const mm = gsap.matchMedia()
      mm.add(
        {
          motion: '(prefers-reduced-motion: no-preference)',
          reduced: '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          const { reduced } = context.conditions as Record<string, boolean>

          gsap.utils.toArray<HTMLElement>('[data-rise]').forEach((tile) => {
            // Sem parallax para quem pediu menos movimento: todos sobem juntos,
            // no ritmo do scroll, como conteúdo normal da página.
            const speed = reduced ? 1 : Number(tile.dataset.speed)

            gsap.to(tile, {
              // Distância em que o palco fica grudado; recalculada no resize.
              y: () => -((root.current!.offsetHeight - window.innerHeight) * speed),
              ease: 'none',
              scrollTrigger: {
                trigger: root.current,
                start: 'top top',
                end: 'bottom bottom',
                scrub: true,
                invalidateOnRefresh: true,
              },
            })
          })
        },
      )
    },
    { scope: root },
  )

  return (
    <>
      <section id="trabalhos" ref={root} className="relative h-[250svh] wide:h-[280svh]">
        {/* Palco de uma tela que fica parado enquanto os quadros sobem por ele. */}
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          {/* Quadros atrás do título. */}
          <div className="pointer-events-none absolute inset-0 z-0">
            {works.filter((w) => !w.front).map((w) => (
              <Tile key={w.number} work={w} />
            ))}
          </div>

          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-5 text-center">
            <p data-statement-fade className="eyebrow text-ink/65">
              {COPY.eyebrow}
            </p>
            <h2
              ref={heading}
              className="mt-7 font-display text-[3.5rem] leading-[0.8] font-light text-ink tall-md:mt-9 tall-md:text-[6rem] wide:mt-9 wide:text-[6rem] wide-lg:text-[7rem]"
            >
              {COPY.headingLines.map((line, i) => (
                <span key={line} className="block">
                  {i === 0 ? line : <em className="font-light italic">{line}</em>}
                </span>
              ))}
            </h2>
          </div>

          {/* Quadros na frente do título — a ordem misturada é o que dá camada. */}
          <div className="pointer-events-none absolute inset-0 z-20">
            {works.filter((w) => w.front).map((w) => (
              <Tile key={w.number} work={w} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-[14svh] md:px-10 md:pb-[18svh]">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <p
            ref={body}
            className="max-w-[46ch] text-base leading-relaxed text-balance text-ink/90 md:text-lg"
          >
            {COPY.body}
          </p>

          {/* Sem função por enquanto — aguardando o link de agendamento da Mara. */}
          <button
            type="button"
            data-statement-fade
            className="group relative mt-10 overflow-hidden border border-ink/25 px-9 py-4 md:mt-12"
          >
            <span className="absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-y-100" />
            <span className="eyebrow relative text-ink transition-colors duration-500 group-hover:text-cream">
              {COPY.cta}
            </span>
          </button>
        </div>
      </section>
    </>
  )
}
