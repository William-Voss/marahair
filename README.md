# MaraHair — site da terapeuta capilar

Next.js (App Router) + Tailwind v4 + GSAP (ScrollTrigger, SplitText).
Referência de estrutura e de comportamento de scroll: https://www.ever.co.id/

```bash
pnpm install
pnpm dev     # http://localhost:3000
pnpm build   # build de produção
```

## Como o site é montado

A ordem das seções está em [app/page.tsx](app/page.tsx). Cada seção é um componente
em [components/](components/) e o texto fica numa constante `COPY` no topo do próprio
arquivo — é lá que se edita a escrita, sem mexer no layout.

O fundo **não** é pintado pelas seções: existe uma única camada fixa atrás de tudo
([components/scroll-background.tsx](components/scroll-background.tsx)) que começa rosa
e derrete para creme. O ponto exato da virada é a sentinela `#bg-to-cream`, entre o
portfólio e os serviços em [app/page.tsx](app/page.tsx). Para mudar onde a cor troca,
basta mover essa `div`.

As cores saíram da própria foto da Hero (amostradas do arquivo) e estão em
[app/globals.css](app/globals.css): `--rose`, `--rose-deep`, `--rose-soft`, `--cream`,
`--ink`.

## O que ainda é provisório

### Textos
Todo texto de rascunho está numa constante `COPY` marcada com `⚠️ TEXTO PROVISÓRIO`
no topo de cada componente. A lista de serviços é compartilhada entre o menu e a
seção de serviços, e mora em [lib/services.ts](lib/services.ts).

### Dados de contato
Estão como `[PLACEHOLDER]` — procurar por `AQUI]` no projeto acha todos:

| Onde | O que falta |
| --- | --- |
| [components/site-footer.tsx](components/site-footer.tsx) | Facebook, endereço, dias e horários, crédito do estúdio |
| [components/faq.tsx](components/faq.tsx) | formas de pagamento, endereço, horários |

### WhatsApp

O número mora num lugar só: [lib/whatsapp.ts](lib/whatsapp.ts). Trocar lá muda o
site inteiro.

> ⚠️ **Conferir o número.** O informado foi "+55 41 9722-9960", que tem 8 dígitos
> locais. Celular brasileiro tem 9 desde 2016, então assumi que faltou o 9 da frente:
> **41 99722-9960** (`5541997229960`). Confirmar antes de mostrar para a cliente.

Cada card de serviço abre o WhatsApp com uma mensagem já escrita citando o serviço
("...queria saber mais sobre Reconstrução..."), montada por `mensagemServico()`. O
card inteiro é clicável: o link do rodapé do card usa `after:absolute after:inset-0`
para esticar a área de toque por cima de tudo, o que dá um alvo grande no celular sem
que o leitor de tela leia a descrição inteira como nome do link.

Também estão ligados: o "Chamar no WhatsApp" no fim do FAQ, o contato do rodapé e o
número no rodapé do menu.

**Ainda inerte de propósito:** o "Marcar Horário" do cabeçalho e o da seção "a arte do
cuidado essencial", porque você pediu para deixar sem função. Agora que o número
existe, é só trocar o `<button>` por um `<a href={whatsappLink(MENSAGEM_GERAL)}>`.

### Imagens
Fotos definitivas (do ensaio profissional):

- `public/mara-hero.png` — a Hero
- `public/mara-retrato.png` — a foto que cresce no scroll ("seu ritual começa aqui")
- `public/mara-retrato2.png` — o retrato dentro da seção de serviços
- `public/trabalhos/cachos-definidos.png` e `transicao-capilar.png` — 2 dos 6 quadros

> ⚠️ **O resto das fotos é PROVISÓRIO.** Foram puxadas do Instagram só para a Mara ver
> o site vivo antes de escolher as definitivas.

As provisórias são os outros 4 arquivos `.jpg` de `public/trabalhos/` e os 6 de
`public/servicos/`. Dá para saber pela extensão: **`.png` é foto boa do ensaio,
`.jpg` é provisória do Instagram.**

Os quadros da seção de trabalhos **não têm mais rótulo escrito por cima** — são só a
foto. O `title` de cada item da lista `works` continua existindo, mas agora serve só
de texto alternativo reserva quando o `alt` não é preenchido.

Três coisas para lembrar na hora de trocar:

1. **Resolução.** O perfil tem 12 publicações e só **2 são fotos** — essas vieram em
   3024×4032. As outras 10 são reels, cujas capas saem em 361×640 e precisaram ser
   ampliadas. Os originais do celular da Mara vão ser muito melhores.
2. **O letreiro da *Aurora Estética & Beleza*** aparece ao fundo de quase todas. É a
   placa física do salão, não dá para tirar no recorte.
3. **Rostos de clientes identificáveis.** Para uso comercial no site, a Mara precisa
   da autorização de cada uma — postar no Instagram dela é uma coisa, o site é outra.

Como trocar: na lista `works` de [works-statement.tsx](components/works-statement.tsx)
e em `cardImages` de [therapist-services.tsx](components/therapist-services.tsx), o
campo `src` é **opcional** — item sem `src` volta sozinho para o gradiente de
placeholder. Basta pôr o arquivo novo na pasta e apontar `src` + `alt`.

- [components/works-statement.tsx](components/works-statement.tsx) — 6 quadros que sobem
- [components/therapist-services.tsx](components/therapist-services.tsx) — retrato da Mara + 6 cards
- [components/growing-image.tsx](components/growing-image.tsx) — a foto que cresce no scroll

### Botões sem função
"Marcar Horário" (cabeçalho e seção "a arte do cuidado essencial") e "Chamar no
WhatsApp" (fim do FAQ) estão inertes de propósito, esperando o link de agendamento.
Estão marcados com `TODO` no código.

### Logo
Não existe logo ainda: a marca é o texto "MaraHair" em Cormorant Garamond
(`Mara` normal + `Hair` itálico), usado no cabeçalho e como assinatura gigante no pé
da página. O favicon em [app/icon.svg](app/icon.svg) também é provisório.

## Detalhes que valem saber antes de mexer

**A Hero muda de layout pela proporção da tela, não pela largura.** Em tela em pé
(celular e tablet vertical) o texto fica em cima e a foto vira uma faixa embaixo,
cuja borda superior se dissolve no fundo rosa — funciona porque o fundo do estúdio
na foto é exatamente a mesma cor do fundo do site. Em tela deitada a foto ocupa tudo
e o texto usa o espaço vazio à esquerda. Isso é controlado pelas variantes `wide:`,
`wide-lg:` e `tall-md:`, definidas no topo de [app/globals.css](app/globals.css).
Usar `md:` na Hero quebra o tablet em pé.

**As animações são todas GSAP.** A revelação de títulos linha a linha é o hook
[lib/use-lines-reveal.ts](lib/use-lines-reveal.ts) (SplitText com `autoSplit`, que
refaz a quebra sozinho quando a fonte carrega ou a tela muda de tamanho). Os cards
de serviço usam `ScrollTrigger.batch()` em vez de um trigger por item, para o scroll
não pesar no celular.

**A seção dos trabalhos** ([components/works-statement.tsx](components/works-statement.tsx))
é uma seção alta (250–280svh) com um "palco" `sticky` de uma tela dentro dela: o
título fica parado no meio enquanto os quadros sobem por ele. Cada quadro tem um
`top` inicial (acima de 100% ele começa abaixo da dobra) e um `speed` — 1 acompanha
o scroll, acima disso passa correndo, abaixo fica para trás. É essa diferença que dá
profundidade. Alguns quadros passam na frente do título e outros atrás (`front:
true/false`), que é o que faz a cena ter camada. Para mexer na coreografia, é só
mudar `top` e `speed` na lista `works` — nada mais precisa ser tocado.
