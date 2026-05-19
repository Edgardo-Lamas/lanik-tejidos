// Webhook del agente LaNik para WhatsApp Business API
// Docs Meta: https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks
//
// Variables de entorno necesarias en Vercel:
//   ANTHROPIC_API_KEY       → console.anthropic.com/settings/api-keys
//   WHATSAPP_TOKEN          → Meta Developer App → WhatsApp → API Setup
//   WHATSAPP_PHONE_NUMBER_ID → Meta Developer App → WhatsApp → API Setup
//   WHATSAPP_VERIFY_TOKEN   → cualquier string que vos elijas (ej: "lanik2024")

export const prerender = false

import type { APIRoute } from 'astro'
import { buildSystemPrompt } from '../../lib/build-prompt'

const {
  WHATSAPP_TOKEN,
  WHATSAPP_PHONE_NUMBER_ID,
  WHATSAPP_VERIFY_TOKEN,
  ANTHROPIC_API_KEY,
} = import.meta.env

// ── GET: verificación del webhook por Meta ─────────────────────────
export const GET: APIRoute = ({ url }) => {
  const mode      = url.searchParams.get('hub.mode')
  const token     = url.searchParams.get('hub.verify_token')
  const challenge = url.searchParams.get('hub.challenge')

  if (mode === 'subscribe' && token === WHATSAPP_VERIFY_TOKEN) {
    console.log('[LaNik WA] Webhook verificado ✓')
    return new Response(challenge, { status: 200 })
  }

  return new Response('Verification failed', { status: 403 })
}

// ── POST: mensajes entrantes ───────────────────────────────────────
export const POST: APIRoute = async ({ request }) => {
  let body: any
  try {
    body = await request.json()
  } catch {
    return new Response('Invalid JSON', { status: 400 })
  }

  // Confirmar recepción a Meta inmediatamente
  const entry   = body?.entry?.[0]
  const changes = entry?.changes?.[0]
  const value   = changes?.value

  if (!value?.messages?.length) {
    return new Response('OK', { status: 200 })
  }

  const msg = value.messages[0]

  // Solo procesar mensajes de texto
  if (msg.type !== 'text') {
    await sendWhatsApp(msg.from, '¡Hola! Por ahora solo proceso mensajes de texto. ¿En qué te puedo ayudar? 🧶')
    return new Response('OK', { status: 200 })
  }

  const userText = msg.text.body.trim()
  const from     = msg.from // número en formato internacional sin "+"

  console.log(`[LaNik WA] Mensaje de ${from}: "${userText}"`)

  // Llamar a Claude con el system prompt completo
  try {
    const reply = await callClaude(userText)
    await sendWhatsApp(from, reply)
  } catch (err) {
    console.error('[LaNik WA] Error:', err)
    await sendWhatsApp(from, 'Hubo un problema, te respondo en un momento. Podés escribirnos directamente a este WhatsApp 🙏')
  }

  return new Response('OK', { status: 200 })
}

// ── Claude API ─────────────────────────────────────────────────────
async function callClaude(userMessage: string): Promise<string> {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 512,
      system: buildSystemPrompt(),
      messages: [
        { role: 'user', content: userMessage },
      ],
    }),
  })

  if (!response.ok) {
    throw new Error(`Claude API error: ${response.status}`)
  }

  const data = await response.json()
  return data.content?.[0]?.text ?? 'No pude procesar tu consulta, disculpá 🙏'
}

// ── WhatsApp Cloud API ─────────────────────────────────────────────
async function sendWhatsApp(to: string, text: string): Promise<void> {
  const url = `https://graph.facebook.com/v19.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to,
      type: 'text',
      text: { body: text },
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`WhatsApp API error: ${res.status} — ${err}`)
  }
}
