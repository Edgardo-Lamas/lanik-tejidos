export const prerender = false

import { gorras } from '../../../data/gorras'
import { artesanias } from '../../../data/artesanias'
import type { APIRoute } from 'astro'

function buildContext(): string {
  const gorrasCtx = gorras
    .map(g => `- ${g.nombre} | ${g.badge} | $${g.precio.toLocaleString('es-AR')}`)
    .join('\n')

  const arteCtx = artesanias
    .map(a => `- [${a.categoria}] ${a.nombre} | ${a.badge} | ${a.precio ? '$' + a.precio.toLocaleString('es-AR') : 'Consultar'}`)
    .join('\n')

  const agotados = [...gorras, ...artesanias].filter(p => p.badge === 'Agotado').map(p => p.nombre)
  const limitadas = [...gorras, ...artesanias].filter(p => p.badge === 'Serie Limitada').map(p => p.nombre)
  const encargos = artesanias.filter(a => a.badge === 'Encargo').map(a => a.nombre)

  const categoriaCount: Record<string, number> = {}
  artesanias.forEach(a => { categoriaCount[a.categoria] = (categoriaCount[a.categoria] || 0) + 1 })
  const catResumen = Object.entries(categoriaCount).map(([c, n]) => `${c}: ${n}`).join(', ')

  return `CATÁLOGO ACTUAL:
GORRAS (${gorras.length} modelos): ${gorrasCtx}
ARTESANÍAS (${artesanias.length} piezas — ${catResumen}): ${arteCtx}
STOCK: Agotados: ${agotados.join(', ') || 'Ninguno'} | Limitadas: ${limitadas.join(', ')} | Encargo: ${encargos.join(', ')}`
}

export const POST: APIRoute = async ({ request }) => {
  const apiKey = import.meta.env.ANTHROPIC_API_KEY

  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'ANTHROPIC_API_KEY no configurada en Vercel' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  let body: { messages?: { role: string; content: string }[] }
  try {
    body = await request.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Body inválido' }), { status: 400 })
  }

  const messages = body.messages ?? []
  if (!messages.length) {
    return new Response(JSON.stringify({ error: 'Sin mensajes' }), { status: 400 })
  }

  const systemPrompt = `Sos el agente especialista de LaNik, marca de tejidos artesanales de Buenos Aires fundada por Natalia Szpitalnik.

Podés ayudar con: análisis del catálogo, estrategias de marketing, ideas para Instagram, SEO, pricing, campañas comerciales, y cualquier consulta de gestión del negocio.

Tu tono es profesional pero cálido, en español argentino. Respondés de forma concisa y accionable. Para listas usás guiones (-). Para secciones usás ## título.

${buildContext()}`

  const resp = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      stream: true,
      system: systemPrompt,
      messages,
    }),
  })

  if (!resp.ok) {
    const err = await resp.text()
    return new Response(JSON.stringify({ error: `Claude API error: ${err}` }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const reader = resp.body!.getReader()
  const decoder = new TextDecoder()

  const stream = new ReadableStream({
    async start(controller) {
      while (true) {
        const { done, value } = await reader.read()
        if (done) { controller.close(); break }
        const chunk = decoder.decode(value, { stream: true })
        for (const line of chunk.split('\n')) {
          if (!line.startsWith('data: ')) continue
          const data = line.slice(6).trim()
          if (data === '[DONE]') continue
          try {
            const json = JSON.parse(data)
            if (json.type === 'content_block_delta' && json.delta?.type === 'text_delta') {
              controller.enqueue(new TextEncoder().encode(json.delta.text))
            }
          } catch {}
        }
      }
    },
  })

  return new Response(stream, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
