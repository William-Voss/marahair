'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin, SplitText)
}

export { gsap, ScrollTrigger, ScrollToPlugin, SplitText, useGSAP }
