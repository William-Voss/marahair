// ⚠️ TEXTO PROVISÓRIO — rascunho para revisar com a Mara.
// Esta lista alimenta tanto os cards da seção de serviços quanto o menu do cabeçalho.
export type Service = {
  number: string
  title: string
  description: string
  treatments: string[]
}

export const services: Service[] = [
  {
    number: '01',
    title: 'Diagnóstico Capilar',
    description:
      'Todo tratamento começa por entender o seu fio. Avaliação do couro cabeludo e da fibra capilar com tricoscopia, histórico e rotina — para desenhar um protocolo que faz sentido para você, e não um pacote pronto.',
    treatments: ['Tricoscopia digital', 'Anamnese capilar', 'Plano de tratamento'],
  },
  {
    number: '02',
    title: 'Hidratação & Nutrição',
    description:
      'Maciez que se sente no toque e dura. Reposição de água, lipídios e nutrientes na medida exata do que o seu cabelo perdeu — sem pesar, sem efeito plástico, respeitando o movimento natural.',
    treatments: ['Hidratação profunda', 'Nutrição com óleos', 'Selagem de brilho'],
  },
  {
    number: '03',
    title: 'Reconstrução',
    description:
      'Para fios cansados de química, calor ou tempo. Devolvemos massa e resistência à fibra em etapas, com pausa entre as sessões, para reconstruir de verdade em vez de mascarar a quebra.',
    treatments: ['Reconstrução em etapas', 'Reposição de massa', 'Cronograma capilar'],
  },
  {
    number: '04',
    title: 'Queda & Crescimento',
    description:
      'Cuidado sério para quem está perdendo cabelo. Protocolo de estímulo do couro cabeludo com acompanhamento mês a mês, registro fotográfico e ajustes conforme o seu resultado.',
    treatments: ['Detox do couro cabeludo', 'Estímulo de crescimento', 'Acompanhamento mensal'],
  },
  {
    number: '05',
    title: 'Cachos & Textura',
    description:
      'Seu cacho no formato dele. Definição, volume e leveza a partir da leitura da sua curvatura — com corte, tratamento e finalização pensados para o dia a dia, não só para o dia do salão.',
    treatments: ['Corte a seco', 'Definição de cachos', 'Transição capilar'],
  },
  {
    number: '06',
    title: 'Corte & Finalização',
    description:
      'O corte que respeita a sua rotina. Linhas desenhadas para o formato do rosto e para o tempo que você realmente tem de manhã — com finalização ensinada passo a passo antes de você ir embora.',
    treatments: ['Corte personalizado', 'Finalização com escova', 'Consultoria de rotina'],
  },
]
