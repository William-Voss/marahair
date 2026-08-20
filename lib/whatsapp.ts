/**
 * ⚠️ CONFERIR ANTES DE PUBLICAR.
 *
 * O William passou "+55 41 9722-9960", que tem só 8 dígitos locais. Celular
 * brasileiro tem 9 desde 2016 (9XXXX-XXXX), então assumi que faltou o 9 da
 * frente: 41 99722-9960. Se o número certo for outro, é só corrigir aqui —
 * o site inteiro lê deste arquivo.
 */
export const WHATSAPP_NUMERO = '5541997229960'

/** Como o número aparece escrito na tela. */
export const WHATSAPP_DISPLAY = '(41) 99722-9960'

/** Monta o link do WhatsApp já com a mensagem pronta para a cliente enviar. */
export function whatsappLink(mensagem: string) {
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensagem)}`
}

/** Mensagem de quem clicou num serviço específico. */
export function mensagemServico(servico: string) {
  return `Oi, Mara! Vim pelo site e queria saber mais sobre ${servico}. Pode me passar os horários?`
}

/** Mensagem de quem clicou num botão genérico de agendamento. */
export const MENSAGEM_GERAL =
  'Oi, Mara! Vim pelo site e gostaria de marcar um horário. Pode me ajudar?'
