# LaNik Tejidos — Guía para Claude Code

## Proyecto
E-commerce de gorras y artesanías tejidas a mano. Buenos Aires, Palermo Soho.
Series limitadas, sin reposición. Identidad: cálido, único, artesanal.

**Repo:** https://github.com/Edgardo-Lamas/lanik-tejidos  
**Producción:** https://lanik-tejidos.vercel.app  
**Deploy:** automático en cada push a `origin/master` (rama local: `main`)

```
git push origin main:master
```

---

## Stack

- **Framework:** Astro 6 — `output: 'server'` con `export const prerender = true` en cada página estática
- **Adapter:** `@astrojs/vercel` con Web Analytics habilitado
- **Estilos:** CSS vanilla con variables globales en `src/styles/global.css`
- **Fuentes:** Space Grotesk (títulos `--font-head`) + Inter (cuerpo `--font-body`) vía Google Fonts
- **Imágenes:** formato WebP preferido; las fotos de gorras son JPG originales

---

## Variables de entorno (Vercel)

| Variable | Uso |
|----------|-----|
| `ANTHROPIC_API_KEY` | Claude API para el agente del dashboard |
| `DASHBOARD_PIN` | PIN de acceso al dashboard (default: `1408`) |
| `WHATSAPP_TOKEN` | Webhook WhatsApp Business |
| `WHATSAPP_VERIFY_TOKEN` | Verificación del webhook |
| `WHATSAPP_PHONE_ID` | ID de teléfono WhatsApp Business |

---

## Estructura clave

```
src/
  data/
    site.ts          # SITE config: URL, WhatsApp, Instagram, GA4
    gorras.ts        # Array de 7 gorras con fotos, precio, badge, colores
    artesanias.ts    # Array de artesanías con categorías
  pages/
    index.astro      # Home: hero + proceso + productos + video + contacto
    gorras/
      index.astro    # Grilla de cards con hover swap de imagen
      [id].astro     # Detalle de gorra con galería
    artesanias/
      index.astro    # Grilla con filtro por categoría + hover swap
      [id].astro     # Detalle de artesanía
    dashboard/
      index.astro    # Panel admin protegido con PIN
    api/
      dashboard/agente.ts   # Endpoint Claude con rate limit (20 req/min)
      whatsapp.ts           # Webhook WhatsApp Business
    404.astro
    sobre-lanik.astro
  components/
    Nav.astro        # Usa SITE.wa y SITE.waDefault
    Footer.astro     # Usa SITE.wa
    WaFloat.astro    # Botón flotante WhatsApp, usa SITE.wa
  layouts/
    BaseLayout.astro # GA4, OG tags, preload hero, fonts
public/
  fotos-lanik/       # Fotos de gorras por modelo (mod-1 a mod-7)
  fotos-canva/       # Imágenes de secciones del home (WebP)
  artesanias/        # Fotos de artesanías (WebP)
  robots.txt
```

---

## Paleta de colores (variables CSS)

| Variable | Hex | Uso |
|----------|-----|-----|
| `--terracota` | `#B5432A` | Color principal de marca |
| `--terracota-light` | `#C9573C` | Hover |
| `--charcoal` | `#1A1A1A` | Fondo principal |
| `--charcoal-mid` | `#2C2C2C` | Fondos secundarios |
| `--sage` | `#8FAF9A` | Acento frío |
| `--crema` | `#F5EFE0` | Textos claros |
| `--ocre` | `#C4882A` | Acento cálido |
| `--azul` | `#7BACC4` | Acento secundario |
| `--white` | `#FFFFFF` | Texto sobre oscuro |

---

## Hover swap en cards (gorras y artesanías)

Las cards muestran `fotos[0]` (`.img-primary`) y en hover muestran `fotos[1]` (`.img-hover`).  
El array `fotos[]` en `gorras.ts` está ordenado para que `fotos[1]` sea la foto más visualmente distinta de `fotos[0]`.

**Estado actual por modelo:**

| Modelo | Hover actual | Necesita foto nueva |
|--------|-------------|---------------------|
| Mod-1 Bicolor Slouch | Mod1-05 (vista arriba) | No |
| Mod-2 Terracota Ribbed | Mod2-03 (más caída) | No |
| Mod-3 Café Azul | Mod3-02 (muy similar) | **Sí** |
| Mod-4 Dark Melange | Mod4-03 (vista trasera) | No |
| Mod-5 Paleta Otoño | Mod5-02 (closeup textura) | No |
| Mod-6 Sage Geo | Mod6-02 (ángulo similar) | **Sí** |
| Mod-7 Pompón Natural | Mod7-03 (pompón arriba) | No |

Fotos pendientes: una foto con ángulo distinto para Mod-3 y Mod-6. Idealmente también una foto por modelo con persona usando la gorra (contraste lifestyle vs producto).

---

## Tamaño de imágenes

- **Hero:** `hero-lifestyle.jpg` — 880×1184 px, 263 KB (FLUX generada + etiqueta LaNik)
- **Cards de gorras:** JPG originales en ~900 KB–1 MB. **Pendiente reemplazar por versiones 900×1125 px optimizadas.**
- **Artesanías y canva:** WebP convertidos con `cwebp`

Para convertir PNG → WebP: `cwebp -q 82 input.png -o output.webp`  
Para redimensionar: `sips -Z 900 imagen.jpg`

---

## Imágenes con IA

Ver `LANIK_BRIEF_VISUAL.md` en la raíz del proyecto antes de generar cualquier imagen con FLUX.  
Contiene: paleta hex, estética de referencia (Ruah), fórmula de prompts, lo que NO es LaNik, y el prompt validado del hero.

Skills disponibles en Claude Code: `bfl-api` y `flux-best-practices`.

---

## Convenciones

- Todo el número de WhatsApp centralizado en `SITE.wa` — nunca hardcodear
- Páginas estáticas requieren `export const prerender = true` en el frontmatter
- Rate limit en endpoints de API: 20 req/min por IP (Map en memoria)
- Dashboard en `/dashboard` con `noindex` y PIN de entorno
- Sin comentarios en el código salvo que el WHY sea no obvio
