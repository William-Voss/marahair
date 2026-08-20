'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'

/**
 * Camada de cor que ocupa a tela inteira atrás de todo o conteúdo. Todas as
 * seções são transparentes e deixam esta camada aparecer, então a página troca
 * de fundo continuamente em vez de encostar blocos de cor diferentes.
 *
 * Rosa (mesmo tom do fundo da foto da Hero) até o fim do portfólio, depois
 * derrete para o creme ao longo de uma tela inteira de scroll. O ponto exato da
 * virada é a sentinela `#bg-to-cream`, posicionada em `app/page.tsx`.
 */
export function ScrollBackground() {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const el = ref.current
    const sentinel = document.querySelector('#bg-to-cream')
    if (!el || !sentinel) return

    const root = getComputedStyle(document.documentElement)
    const rose = root.getPropertyValue('--rose').trim()
    const cream = root.getPropertyValue('--cream').trim()

    gsap.set(el, { backgroundColor: rose })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sentinel,
        start: 'top bottom',
        end: 'top top',
        scrub: true,
      },
    })

    tl.to(el, { backgroundColor: cream, ease: 'none' }, 0)
    tl.to('[data-bg-warmth]', { opacity: 0, ease: 'none' }, 0)
  })

  return (
    <div ref={ref} aria-hidden className="fixed inset-0 -z-10">
      {/* Aquece o centro da tela para o rosa não ficar chapado. */}
      <div
        data-bg-warmth
        className="absolute inset-0 opacity-100"
        style={{
          background:
            'radial-gradient(120% 90% at 50% 30%, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0) 55%), radial-gradient(90% 70% at 50% 100%, rgba(120,80,65,0.16) 0%, rgba(120,80,65,0) 60%)',
        }}
      />
    </div>
  )
}
