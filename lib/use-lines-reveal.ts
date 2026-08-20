'use client'

import { useRef } from 'react'
import { gsap, SplitText, useGSAP } from '@/lib/gsap'

type Options = {
  /** Anima assim que a página carrega, em vez de esperar o scroll. */
  immediate?: boolean
  delay?: number
  stagger?: number
  start?: string
}

/**
 * Quebra o texto do elemento em linhas e faz cada uma subir de trás de uma
 * máscara. `autoSplit` refaz a quebra sozinho quando a fonte carrega ou a
 * largura muda, então o texto nunca fica cortado no lugar errado.
 */
export function useLinesReveal<T extends HTMLElement>({
  immediate = false,
  delay = 0,
  stagger = 0.08,
  start = 'top 85%',
}: Options = {}) {
  const ref = useRef<T>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return

      // Quem pediu menos movimento no sistema recebe o texto já no lugar.
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const split = SplitText.create(el, {
        type: 'lines',
        mask: 'lines',
        linesClass: 'split-line',
        autoSplit: true,
        onSplit(self) {
          return gsap.from(self.lines, {
            yPercent: 115,
            duration: 1.15,
            ease: 'power3.out',
            stagger,
            delay,
            scrollTrigger: immediate ? undefined : { trigger: el, start, once: true },
          })
        },
      })

      return () => split.revert()
    },
    { scope: ref },
  )

  return ref
}
