export interface Producto {
  id: string
  nombre: string
  descripcion: string
  colores: string[]
  precio: number
  badge: 'Disponible' | 'Serie Limitada' | 'Últimas unidades' | 'Agotado'
  fotos: string[]
  fotoHero: string
  disponible: boolean
  waMessage: string
}

export const gorras: Producto[] = [
  {
    id: 'mod-1',
    nombre: 'Bicolor Slouch',
    descripcion: 'Forma holgada con franja bicolor. Textura estructurada punto a punto.',
    colores: ['Azul cielo', 'Gris melange'],
    precio: 40000,
    badge: 'Disponible',
    fotos: [
      '/fotos-lanik/mod-1/Mod1-01.jpg',
      '/fotos-lanik/mod-1/Mod1-02.jpg',
      '/fotos-lanik/mod-1/Mod1-03.jpg',
      '/fotos-lanik/mod-1/Mod1-04.jpg',
      '/fotos-lanik/mod-1/Mod1-05.jpg',
    ],
    fotoHero: '/fotos-lanik/mod-1/Mod1-01.jpg',
    disponible: true,
    waMessage: 'Hola! Me interesa la Bicolor Slouch',
  },
  {
    id: 'mod-2',
    nombre: 'Terracota Ribbed',
    descripcion: 'Punto ribbed de alta densidad. Terracota intenso con contraste azul noche.',
    colores: ['Terracota', 'Azul noche'],
    precio: 42000,
    badge: 'Disponible',
    fotos: [
      '/fotos-lanik/mod-2/Mod2-01.jpg',
      '/fotos-lanik/mod-2/Mod2-02.jpg',
      '/fotos-lanik/mod-2/Mod2-03.jpg',
      '/fotos-lanik/mod-2/Mod2-04.jpg',
    ],
    fotoHero: '/fotos-lanik/mod-2/Mod2-01.jpg',
    disponible: true,
    waMessage: 'Hola! Me interesa la Terracota Ribbed',
  },
  {
    id: 'mod-3',
    nombre: 'Café Azul',
    descripcion: 'Marrón cálido con detalle azul cielo. Etiqueta artesanal LaNik visible.',
    colores: ['Marrón', 'Azul cielo'],
    precio: 42000,
    badge: 'Disponible',
    fotos: [
      '/fotos-lanik/mod-3/Mod3-01.jpg',
      '/fotos-lanik/mod-3/Mod3-02.jpg',
    ],
    fotoHero: '/fotos-lanik/mod-3/Mod3-01.jpg',
    disponible: true,
    waMessage: 'Hola! Me interesa la Café Azul',
  },
  {
    id: 'mod-4',
    nombre: 'Dark Melange',
    descripcion: 'Negro y gris melange. Tejido urbano de textura densa y silueta limpia.',
    colores: ['Negro', 'Gris melange'],
    precio: 40000,
    badge: 'Disponible',
    fotos: [
      '/fotos-lanik/mod-4/Mod4-01.jpg',
      '/fotos-lanik/mod-4/Mod4-02.jpg',
      '/fotos-lanik/mod-4/Mod4-03.jpg',
    ],
    fotoHero: '/fotos-lanik/mod-4/Mod4-01.jpg',
    disponible: true,
    waMessage: 'Hola! Me interesa la Dark Melange',
  },
  {
    id: 'mod-5',
    nombre: 'Paleta Otoño',
    descripcion: 'Multicolor terracota, teal y gris. Serie limitada — cuando se agota, no hay reposición.',
    colores: ['Terracota', 'Teal', 'Gris'],
    precio: 48000,
    badge: 'Serie Limitada',
    fotos: [
      '/fotos-lanik/mod-5/Mod5-01.jpg',
      '/fotos-lanik/mod-5/Mod5-02.jpg',
      '/fotos-lanik/mod-5/Mod5-03.jpg',
      '/fotos-lanik/mod-5/Mod5-04.jpg',
    ],
    fotoHero: '/fotos-lanik/mod-5/Mod5-01.jpg',
    disponible: true,
    waMessage: 'Hola! Me interesa la Paleta Otoño',
  },
  {
    id: 'mod-6',
    nombre: 'Sage Geo',
    descripcion: 'Verde sage con patrón geométrico tejido. Textura sofisticada y color único.',
    colores: ['Verde sage'],
    precio: 44000,
    badge: 'Últimas unidades',
    fotos: [
      '/fotos-lanik/mod-6/Mod6-01.jpg',
      '/fotos-lanik/mod-6/Mod6-02.jpg',
      '/fotos-lanik/mod-6/Mod6-03.jpg',
    ],
    fotoHero: '/fotos-lanik/mod-6/Mod6-01.jpg',
    disponible: true,
    waMessage: 'Hola! Me interesa la Sage Geo',
  },
  {
    id: 'mod-7',
    nombre: 'Pompón Natural',
    descripcion: 'Beige natural con pompón artesanal. Acabado delicado, ideal para el invierno.',
    colores: ['Beige natural'],
    precio: 46000,
    badge: 'Disponible',
    fotos: [
      '/fotos-lanik/mod-7/Mod7-01.jpg',
      '/fotos-lanik/mod-7/Mod7-02.jpg',
      '/fotos-lanik/mod-7/Mod7-03.jpg',
      '/fotos-lanik/mod-7/Mod7-04.jpg',
    ],
    fotoHero: '/fotos-lanik/mod-7/Mod7-01.jpg',
    disponible: true,
    waMessage: 'Hola! Me interesa la Pompón Natural',
  },
]
