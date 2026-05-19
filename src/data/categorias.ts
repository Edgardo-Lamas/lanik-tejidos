export interface Categoria {
  slug: string
  nombre: string
  tagline: string
  descripcion: string
  fotoHero: string
  cantidad: number
  disponible: boolean
}

export const categorias: Categoria[] = [
  {
    slug: 'gorras',
    nombre: 'Gorras',
    tagline: 'Tejidas a mano · Buenos Aires',
    descripcion: '7 modelos únicos. Punto a punto, sin producción en serie.',
    fotoHero: '/fotos-lanik/mod-3/Mod3-01.jpg',
    cantidad: 7,
    disponible: true,
  },
  {
    slug: 'artesanias',
    nombre: 'Artesanías',
    tagline: 'Nuevas piezas · Próximamente',
    descripcion: 'Bufandas, accesorios y otras creaciones tejidas. En desarrollo.',
    fotoHero: '/fotos-lanik/mod-5/Mod5-02.jpg',
    cantidad: 0,
    disponible: false,
  },
]
