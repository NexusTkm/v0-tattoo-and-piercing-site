"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, X, ChevronLeftIcon, ChevronRight } from "lucide-react"

interface Trabajo {
  id: string
  titulo: string
  artista: string
  categoria: string
  descripcion: string
  fecha: string
  ubicacion: string
  tamaño: string
  image: string
}

export default function Galeria() {
  const [selectedWork, setSelectedWork] = useState<Trabajo | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState("todos")

  const trabajos: Trabajo[] = [
    {
      id: 1,
      titulo: "Mandala Geométrico",
      artista: "Carlos Martinez",
      categoria: "mandala",
      descripcion: "Mandala en blanco y negro con patrones geométricos precisos",
      fecha: "Diciembre 2024",
      ubicacion: "Brazo",
      tamaño: "15cm x 15cm",
      image: "mandala",
    },
    {
      id: 2,
      titulo: "Rosa Roja Realista",
      artista: "Ana García",
      categoria: "realismo",
      descripcion: "Rosa realista con colores vibrantes y sombras detalladas",
      fecha: "Noviembre 2024",
      ubicacion: "Muslo",
      tamaño: "20cm x 25cm",
      image: "rosa",
    },
    {
      id: 3,
      titulo: "Phoenix en Fuego",
      artista: "Carlos Martinez",
      categoria: "fantasia",
      descripcion: "Phoenix mitológico con llamas en colores cálidos",
      fecha: "Octubre 2024",
      ubicacion: "Espalda",
      tamaño: "30cm x 40cm",
      image: "phoenix",
    },
    {
      id: 4,
      titulo: "Símbolos Celtas",
      artista: "Miguel López",
      categoria: "tribal",
      descripcion: "Patrón celta tradicional en líneas negras",
      fecha: "Septiembre 2024",
      ubicacion: "Antebrazo",
      tamaño: "12cm x 18cm",
      image: "celta",
    },
    {
      id: 5,
      titulo: "Luna y Estrellas",
      artista: "Ana García",
      categoria: "linework",
      descripcion: "Luna decorativa con estrellas en line work fino",
      fecha: "Agosto 2024",
      ubicacion: "Pecho",
      tamaño: "18cm x 12cm",
      image: "luna",
    },
    {
      id: 6,
      titulo: "Dragon Acuarela",
      artista: "Carlos Martinez",
      categoria: "acuarela",
      descripcion: "Dragón en estilo acuarela con colores degradados",
      fecha: "Julio 2024",
      ubicacion: "Brazo completo",
      tamaño: "25cm x 35cm",
      image: "dragon",
    },
    {
      id: 7,
      titulo: "Serpiente Geometría",
      artista: "Miguel López",
      categoria: "geometric",
      descripcion: "Serpiente con patrones geométricos modernos",
      fecha: "Junio 2024",
      ubicacion: "Costilla",
      tamaño: "20cm x 30cm",
      image: "serpiente",
    },
    {
      id: 8,
      titulo: "Flor Sakura",
      artista: "Ana García",
      categoria: "japones",
      descripcion: "Flores de cerezo en estilo japonés tradicional",
      fecha: "Mayo 2024",
      ubicacion: "Hombro",
      tamaño: "16cm x 20cm",
      image: "sakura",
    },
    {
      id: 9,
      titulo: "Brújula Antigua",
      artista: "Miguel López",
      categoria: "linework",
      descripcion: "Brújula detallada con motivos antiguos",
      fecha: "Abril 2024",
      ubicacion: "Muñeca",
      tamaño: "10cm x 10cm",
      image: "brujula",
    },
    {
      id: 10,
      titulo: "Ave Negra Volando",
      artista: "Carlos Martinez",
      categoria: "realismo",
      descripcion: "Pájaro en vuelo con detalle fino en plumas",
      fecha: "Marzo 2024",
      ubicacion: "Pantorrilla",
      tamaño: "18cm x 12cm",
      image: "ave",
    },
    {
      id: 11,
      titulo: "Corazón Roto",
      artista: "Ana García",
      categoria: "simbolico",
      descripcion: "Corazón con elementos simbólicos",
      fecha: "Febrero 2024",
      ubicacion: "Pecho",
      tamaño: "12cm x 14cm",
      image: "corazon",
    },
    {
      id: 12,
      titulo: "Calavera Mexicana",
      artista: "Miguel López",
      categoria: "fantasia",
      descripcion: "Calavera colorida con flores típicas mexicanas",
      fecha: "Enero 2024",
      ubicacion: "Muslo",
      tamaño: "22cm x 28cm",
      image: "calavera",
    },
  ]

  const categorias = [
    "todos",
    "realismo",
    "mandala",
    "tribal",
    "linework",
    "acuarela",
    "geometric",
    "japones",
    "fantasia",
    "simbolico",
  ]

  const trabajosFiltrados =
    selectedCategory === "todos" ? trabajos : trabajos.filter((t) => t.categoria === selectedCategory)

  const handleImageChange = (direction: "prev" | "next") => {
    // Simulado: en una app real, habría múltiples imágenes por trabajo
    setCurrentImageIndex(0)
  }

  return (
    <div className="min-h-screen bg-background pt-20 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-accent hover:text-accent/80 mb-6">
            <ChevronLeft size={20} />
            Volver al inicio
          </Link>
          <h1 className="text-4xl font-bold text-foreground">Galería de Trabajos</h1>
          <p className="text-muted-foreground mt-2">Explora nuestros mejores tatuajes y piercings realizados</p>
        </div>

        {/* Filtros de Categoría */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg border transition capitalize ${
                selectedCategory === cat
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border text-muted-foreground hover:border-accent"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid de Trabajos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {trabajosFiltrados.map((trabajo) => (
            <Card
              key={trabajo.id}
              onClick={() => {
                setSelectedWork(trabajo)
                setCurrentImageIndex(0)
              }}
              className="bg-card border-border hover:border-accent transition cursor-pointer overflow-hidden group"
            >
              {/* Imagen */}
              <div className="aspect-square bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center overflow-hidden relative">
                <div className="text-6xl text-accent/30 group-hover:scale-110 transition">🎨</div>
                <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition" />
              </div>

              {/* Contenido */}
              <div className="p-6">
                <p className="text-xs uppercase tracking-wide text-accent font-semibold mb-2">{trabajo.categoria}</p>
                <h3 className="text-xl font-bold text-foreground mb-2">{trabajo.titulo}</h3>
                <p className="text-sm text-muted-foreground mb-4">{trabajo.descripcion}</p>

                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Artista:</strong> {trabajo.artista}
                  </p>
                  <p>
                    <strong className="text-foreground">Ubicación:</strong> {trabajo.ubicacion}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {trabajosFiltrados.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No se encontraron trabajos en esta categoría</p>
          </div>
        )}
      </div>

      {/* Modal de Detalle */}
      {selectedWork && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
          <Card className="bg-card border-border max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header del Modal */}
            <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">{selectedWork.titulo}</h2>
              <button onClick={() => setSelectedWork(null)} className="p-2 hover:bg-secondary rounded-lg transition">
                <X size={24} className="text-foreground" />
              </button>
            </div>

            {/* Contenido del Modal */}
            <div className="p-6 space-y-6">
              {/* Imagen Grande */}
              <div className="aspect-square bg-gradient-to-br from-accent/20 to-accent/5 rounded-lg flex items-center justify-center relative">
                <div className="text-9xl text-accent/20">🎨</div>

                {/* Navegación de Imagen (simulada) */}
                <button className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-lg opacity-0 hover:opacity-100 transition">
                  <ChevronLeftIcon size={24} />
                </button>
                <button className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-lg opacity-0 hover:opacity-100 transition">
                  <ChevronRight size={24} />
                </button>
              </div>

              {/* Información */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-accent mb-1">CATEGORÍA</h3>
                    <p className="text-foreground capitalize">{selectedWork.categoria}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-accent mb-1">ARTISTA</h3>
                    <p className="text-foreground">{selectedWork.artista}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-accent mb-1">UBICACIÓN</h3>
                    <p className="text-foreground">{selectedWork.ubicacion}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-accent mb-1">TAMAÑO</h3>
                    <p className="text-foreground">{selectedWork.tamaño}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-accent mb-1">FECHA</h3>
                    <p className="text-foreground">{selectedWork.fecha}</p>
                  </div>
                </div>
              </div>

              {/* Descripción */}
              <div>
                <h3 className="text-sm font-semibold text-accent mb-2">DESCRIPCIÓN</h3>
                <p className="text-muted-foreground">{selectedWork.descripcion}</p>
              </div>

              {/* CTA */}
              <div className="bg-secondary rounded-lg p-6 space-y-4">
                <p className="text-foreground font-semibold">¿Te interesa un tatuaje similar?</p>
                <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                  <Link href="/reservar">Solicitar Consulta</Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
