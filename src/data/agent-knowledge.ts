// Base de conocimiento completa del agente LaNik
// Se usa para construir el system prompt dinámicamente

import { gorras } from './gorras'
import { artesanias } from './artesanias'

// ── Catálogo serializado ───────────────────────────────────────────

export function buildCatalogContext(): string {
  const gorrasCtx = gorras.map(g =>
    `• ${g.nombre} | ${g.badge} | $${g.precio.toLocaleString('es-AR')} | Colores: ${g.colores.join(', ')}`
  ).join('\n')

  const arteBycat: Record<string, string[]> = {}
  artesanias.forEach(a => {
    if (!arteBycat[a.categoria]) arteBycat[a.categoria] = []
    const precio = a.precio ? `$${a.precio.toLocaleString('es-AR')}` : 'Consultar'
    arteBycat[a.categoria].push(`  • ${a.nombre} | ${a.badge} | ${precio}`)
  })

  const arteCtx = Object.entries(arteBycat)
    .map(([cat, items]) => `${cat}:\n${items.join('\n')}`)
    .join('\n\n')

  const agotados = [...gorras, ...artesanias].filter(p => !p.disponible || p.badge === 'Agotado').map(p => p.nombre)
  const limitadas = [...gorras, ...artesanias].filter(p => p.badge === 'Serie Limitada').map(p => p.nombre)
  const encargos = artesanias.filter(a => a.badge === 'Encargo').map(a => a.nombre)

  return `
GORRAS TEJIDAS (${gorras.length} modelos):
${gorrasCtx}

ARTESANÍAS (${artesanias.length} piezas):
${arteCtx}

ESTADO DE STOCK:
- Agotados: ${agotados.length > 0 ? agotados.join(', ') : 'Ninguno'}
- Series limitadas (sin reposición): ${limitadas.join(', ')}
- Por encargo (tiempo y precio se acuerda): ${encargos.join(', ')}
`.trim()
}

// ── Conocimiento estático de la marca ─────────────────────────────

export const BRAND_KNOWLEDGE = {
  marca: {
    nombre: 'LaNik',
    fundadora: 'Natalia Szpitalnik',
    descripcion: 'Marca de diseño textil artesanal de Buenos Aires. Cada pieza es tejida a mano por Natalia, con lanas seleccionadas y técnicas aprendidas desde la infancia.',
    historia: 'Natalia aprendió a tejer a los 5 años con su abuela. Desarrolló su técnica durante décadas hasta convertirlo en una marca con identidad propia. Publicó "El Arte de Tejer" (2025-2026) y ha dado charlas en espacios vinculados al diseño textil en Buenos Aires.',
    zona: 'Palermo Soho, Buenos Aires',
    instagram: '@Laniktejidos',
    whatsapp: '+54 9 11 3198-6298 (Alejandro)',
    email: 'laniktejidos@gmail.com',
    sitio: 'https://lanik-tejidos.vercel.app',
  },

  valores: [
    'Cada pieza es única — el tejido artesanal no produce copias exactas',
    'Las series limitadas no tienen reposición una vez agotadas',
    'Los piezas por encargo se acuerdan directamente con Natalia',
    'No hay descuentos — el precio refleja el trabajo artesanal y el tiempo invertido',
    'Las lanas son seleccionadas por calidad y textura, no por precio',
  ],

  materiales: {
    gorras: 'Lana merino, acrílico premium y mezclas seleccionadas. Punto estructurado a mano. Etiqueta artesanal LaNik cosida.',
    sweaters: 'Lana y mezclas de alta densidad. Punto jersey, canalé o texturado según modelo.',
    chalecos: 'Lana en punto inglés, jersey o semilla. Terminaciones a mano.',
    ponchos: 'Lana de alta densidad. Algunos con flecos artesanales en borde.',
    chales: 'Lana fina a media densidad. Tejido calado o liso según pieza.',
    munecos: 'Hilo de algodón o acrílico. Ganchillo punto a punto. Relleno hipoalergénico.',
    pinturas: 'Técnica mixta sobre tela o cartón. Arte textil y pictórico combinados.',
  },

  cuidados: {
    general: 'Lavado a mano con agua fría y jabón neutro. No retorcer. Secar plano sobre toalla.',
    gorras: 'Lavado suave a mano. No usar secadora. Dar forma mientras está húmeda.',
    munecos: 'Limpieza superficial con paño húmedo. No sumergir.',
    pinturas: 'Piezas decorativas — no lavar. Mantener alejadas de humedad directa.',
  },

  logistica: {
    envios: 'Se coordina por WhatsApp. Envíos a todo el país vía correo o moto en CABA/GBA.',
    pago: 'Transferencia bancaria, Mercado Pago o efectivo en mano (Palermo Soho).',
    encargos: 'Los encargos personalizados tienen un tiempo de producción de 10-21 días según la pieza. Se abona 50% al confirmar y 50% al entregar.',
    retiro: 'Retiro en Palermo Soho coordinando día y horario por WhatsApp.',
  },

  rangosPrecio: {
    gorras: '$40.000 - $48.000',
    sweaters: '$85.000 - $98.000',
    chalecos: '$72.000 - $78.000',
    ponchos: '$85.000 - $98.000',
    chales: '$62.000 - $80.000',
    munecos: '$28.000 - $38.000',
    pinturas: 'Consultar precio',
  },

  clienteTipo: [
    'Mujeres de 25-50 años con interés en moda artesanal y sustentable',
    'Personas que valoran lo hecho a mano sobre lo masivo',
    'Compradores de regalos premium y únicos',
    'Amantes de la moda local y el diseño argentino',
    'Coleccionistas de piezas de autor',
  ],

  competencia: {
    diferencial: [
      'Cada pieza es firmada y única — no hay producción en serie',
      'La fundadora es artesana con trayectoria y formación documentada',
      'Series limitadas que generan urgencia de compra genuina',
      'Precio accesible para artesanía de autor vs. marcas de diseño',
    ],
    posicionamiento: 'LaNik se posiciona entre el artesano de feria y la marca de diseñador: calidad y exclusividad de boutique, con la calidez y accesibilidad del trato directo.',
  },

  marketing: {
    tono: 'Cálido, auténtico, no agresivo. Nunca presionar. Mostrar el proceso artesanal.',
    contenidoInstagram: [
      'Videos del proceso de tejido (alto engagement)',
      'Detalles de textura en close-up',
      'Looks completos con las piezas puestas',
      'Stories de "últimas unidades" para crear urgencia',
      'Reels de before/after (lana cruda → pieza terminada)',
    ],
    hashtags: [
      '#tejidoamano', '#knitwear', '#modaargentina', '#artesanal',
      '#tejido', '#handmade', '#buenosaires', '#palosoho',
      '#lananatural', '#moda', '#disenoargentino', '#tejidoartesanal',
    ],
    mejoresMomentos: 'Publicar entre 12-14hs y 20-22hs. Lunes a miércoles mayor engagement en instagram de moda artesanal.',
    temporadas: {
      otonoInvierno: 'Gorras, ponchos, sweaters y chalecos. Temporada alta. Destacar calidez y textura.',
      primaveraverano: 'Chales, muñecos, pinturas. Destacar ligereza y color. Ideal para regalos.',
    },
  },

  seo: {
    palabrasClave: [
      'gorras tejidas a mano Buenos Aires',
      'artesanías tejidas Argentina',
      'ropa tejida artesanal',
      'sweaters tejidos Palermo',
      'ponchos artesanales Buenos Aires',
      'tejido a mano regalo original',
      'muñecos tejidos ganchillo',
      'moda artesanal argentina',
    ],
    descripcionSEO: 'LaNik Tejidos — gorras, sweaters, ponchos y artesanías tejidas a mano en Buenos Aires. Piezas únicas y series limitadas de Natalia Szpitalnik.',
  },

  preguntasFrecuentes: [
    { q: '¿Hacen envíos?', a: 'Sí, a todo el país. El costo y la modalidad se coordinan por WhatsApp según tu ubicación.' },
    { q: '¿Tienen talles?', a: 'Las gorras son talle único (ajustables). Las artesanías como sweaters y chalecos tienen tallas estándar; consultanos para confirmar disponibilidad.' },
    { q: '¿Hacen encargos personalizados?', a: 'Sí, algunas piezas se hacen por encargo. El tiempo es 10-21 días según la complejidad. Hablanos y lo acordamos.' },
    { q: '¿Se puede lavar?', a: 'Lavado a mano con agua fría y jabón neutro. Nunca en lavarropas ni secadora.' },
    { q: '¿Aceptan devoluciones?', a: 'Al ser piezas artesanales únicas, no hacemos devoluciones. Sí hacemos cambios si hay un defecto de fabricación.' },
    { q: '¿Los precios incluyen envío?', a: 'No, el envío se suma. Para retiro en Palermo Soho no hay cargo adicional.' },
    { q: '¿Se pueden pedir en otros colores?', a: 'Depende del modelo y la disponibilidad de lana. Consultanos y vemos opciones.' },
    { q: '¿Tienen local físico?', a: 'No tenemos local propio, pero coordinamos retiro en Palermo Soho. También participamos en ferias de diseño.' },
  ],
}
