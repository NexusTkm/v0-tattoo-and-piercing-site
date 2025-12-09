"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, Calculator, Send } from "lucide-react"

interface Quote {
  id: string
  titulo: string
  descripcion: string
  precioBase: number
  detalles: string[]
  tiempo: string
}

export default function Cotizaciones() {
  const [selectedService, setSelectedService] = useState("")
  const [estimatedPrice, setEstimatedPrice] = useState(0)
  const [showQuoteForm, setShowQuoteForm] = useState(false)
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    descripcion: "",
    tamanio: "medio",
    ubicacion: "",
    complejidad: "media",
  })

  const quotes: Quote[] = [
    {
      id: "tatuaje-pequeno",
      titulo: "Tatuaje Pequeño",
      descripcion: "Diseños compactos perfectos para tu primer tatuaje",
      precioBase: 150,
      detalles: ["Hasta 10cm", "1-2 horas", "Diseño personalizado", "Una sesión"],
      tiempo: "1-2 horas",
    },
    {
      id: "tatuaje-mediano",
      titulo: "Tatuaje Mediano",
      descripcion: "Piezas detalladas con colores y técnicas especiales",
      precioBase: 300,
      detalles: ["10-20cm", "2-4 horas", "Diseño + consultoría", "1-2 sesiones"],
      tiempo: "2-4 horas",
    },
    {
      id: "tatuaje-grande",
      titulo: "Tatuaje Grande",
      descripcion: "Obras maestras que cubren áreas significativas del cuerpo",
      precioBase: 600,
      detalles: ["Más de 20cm", "4-8 horas", "Diseño artístico completo", "2-4 sesiones"],
      tiempo: "4-8 horas",
    },
    {
      id: "tatuaje-realismo",
      titulo: "Tatuaje Realismo/Foto",
      descripcion: "Tatuajes foto-realistas con máximo detalle",
      precioBase: 500,
      detalles: ["Técnica especial", "3-5 horas", "Consultoría premium", "1-2 sesiones"],
      tiempo: "3-5 horas",
    },
    {
      id: "piercing-basico",
      titulo: "Piercing Básico",
      descripcion: "Piercings en orejas, nariz y cuerpo",
      precioBase: 50,
      detalles: ["Equipo estéril", "Incluye joyería", "Cuidados incluidos", "15-30 minutos"],
      tiempo: "15-30 min",
    },
    {
      id: "piercing-especial",
      titulo: "Piercing Especial",
      descripcion: "Piercings faciales y ubicaciones especiales",
      precioBase: 100,
      detalles: ["Procedimiento avanzado", "Joyería premium", "Seguimiento", "30-45 minutos"],
      tiempo: "30-45 min",
    },
    {
      id: "reparacion-tatuaje",
      titulo: "Reparación/Retoque",
      descripcion: "Mejorar o corregir tatuajes existentes",
      precioBase: 200,
      detalles: ["Cobertura o mejora", "1-3 horas", "Diseño personalizado", "Según complejidad"],
      tiempo: "1-3 horas",
    },
    {
      id: "consulta-diseno",
      titulo: "Consulta de Diseño",
      descripcion: "Sesión completa de consultoría y diseño personalizado",
      precioBase: 50,
      detalles: ["1 hora", "Diseño preliminar", "Asesoramiento", "Válido como pago adelantado"],
      tiempo: "1 hora",
    },
  ]

  const calculatePrice = (basePrice: number, size: string, complexity: string): number => {
    let multiplier = 1

    if (size === "pequeno") multiplier *= 0.8
    if (size === "grande") multiplier *= 1.3

    if (complexity === "simple") multiplier *= 0.9
    if (complexity === "compleja") multiplier *= 1.4

    return Math.round(basePrice * multiplier)
  }

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId)
    const service = quotes.find((q) => q.id === serviceId)
    if (service) {
      const price = calculatePrice(service.precioBase, formData.tamanio, formData.complejidad)
      setEstimatedPrice(price)
    }
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (selectedService) {
      const service = quotes.find((q) => q.id === selectedService)
      if (service) {
        const size = name === "tamanio" ? value : formData.tamanio
        const complexity = name === "complejidad" ? value : formData.complejidad
        const price = calculatePrice(service.precioBase, size, complexity)
        setEstimatedPrice(price)
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const service = quotes.find((q) => q.id === selectedService)
    console.log({
      ...formData,
      servicio: selectedService,
      precioEstimado: estimatedPrice,
      servicioNombre: service?.titulo,
    })
    alert(
      `Cotización solicitada. Nos contactaremos en las próximas 24 horas con tu presupuesto personalizado a ${formData.email}`,
    )
    setShowQuoteForm(false)
    setSelectedService("")
    setFormData({
      nombre: "",
      email: "",
      telefono: "",
      descripcion: "",
      tamanio: "medio",
      ubicacion: "",
      complejidad: "media",
    })
  }

  const selectedQuote = quotes.find((q) => q.id === selectedService)

  return (
    <div className="min-h-screen bg-background pt-20 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-accent hover:text-accent/80 mb-6">
            <ChevronLeft size={20} />
            Volver al inicio
          </Link>
          <h1 className="text-4xl font-bold text-foreground">Cotizaciones y Precios</h1>
          <p className="text-muted-foreground mt-2">
            Consulta nuestros precios y solicita tu presupuesto personalizado
          </p>
        </div>

        {!showQuoteForm ? (
          <>
            {/* Grid de Servicios */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {quotes.map((quote) => (
                <Card
                  key={quote.id}
                  className={`bg-card border-2 p-6 cursor-pointer transition ${
                    selectedService === quote.id ? "border-accent" : "border-border hover:border-accent"
                  }`}
                  onClick={() => handleServiceSelect(quote.id)}
                >
                  <h3 className="text-xl font-bold text-foreground mb-2">{quote.titulo}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{quote.descripcion}</p>

                  <div className="space-y-2 mb-6">
                    {quote.detalles.map((detalle, i) => (
                      <p key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                        {detalle}
                      </p>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground">Desde</p>
                    <p className="text-2xl font-bold text-accent">${quote.precioBase}</p>
                  </div>

                  {selectedService === quote.id && (
                    <Button className="w-full mt-6 bg-accent text-accent-foreground hover:bg-accent/90">
                      Seleccionado
                    </Button>
                  )}
                </Card>
              ))}
            </div>

            {/* Calculadora de Precios */}
            {selectedService && (
              <Card className="bg-card border-border p-8 mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <Calculator size={24} /> Calculadora de Precio
                </h2>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Tamaño</label>
                    <select
                      name="tamanio"
                      value={formData.tamanio}
                      onChange={handleFormChange}
                      className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground focus:border-accent outline-none"
                    >
                      <option value="pequeno">Pequeño (-20%)</option>
                      <option value="medio">Medio (sin cambios)</option>
                      <option value="grande">Grande (+30%)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Complejidad</label>
                    <select
                      name="complejidad"
                      value={formData.complejidad}
                      onChange={handleFormChange}
                      className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground focus:border-accent outline-none"
                    >
                      <option value="simple">Simple (-10%)</option>
                      <option value="media">Media (sin cambios)</option>
                      <option value="compleja">Compleja (+40%)</option>
                    </select>
                  </div>

                  <div className="bg-secondary rounded-lg p-4 flex flex-col justify-end">
                    <p className="text-sm text-muted-foreground mb-1">Precio estimado</p>
                    <p className="text-4xl font-bold text-accent">${estimatedPrice}</p>
                  </div>
                </div>

                <Button
                  onClick={() => setShowQuoteForm(true)}
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90 py-3 text-base font-semibold"
                >
                  Solicitar Cotización Personalizada
                </Button>
              </Card>
            )}

            {/* Info */}
            <Card className="bg-secondary border-border p-8">
              <h3 className="text-xl font-bold text-foreground mb-4">¿Cómo funciona nuestro sistema de cotización?</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-accent font-bold">1.</span>
                  <span>Selecciona el servicio que deseas</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">2.</span>
                  <span>Ajusta los parámetros (tamaño, complejidad)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">3.</span>
                  <span>Ve el precio estimado en tiempo real</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">4.</span>
                  <span>Solicita una cotización personalizada con tu idea</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">5.</span>
                  <span>Te contactaremos en 24 horas con presupuesto final</span>
                </li>
              </ul>
            </Card>
          </>
        ) : (
          /* Formulario de Cotización */
          <Card className="bg-card border-border p-8 max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <button onClick={() => setShowQuoteForm(false)} className="p-2 hover:bg-secondary rounded-lg transition">
                <ChevronLeft size={20} className="text-foreground" />
              </button>
              <h2 className="text-2xl font-bold text-foreground">Solicitar Cotización</h2>
            </div>

            {selectedQuote && (
              <div className="bg-secondary rounded-lg p-4 mb-6">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Servicio:</strong> {selectedQuote.titulo}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  <strong className="text-foreground">Precio estimado:</strong>{" "}
                  <span className="text-accent font-bold">${estimatedPrice}</span>
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Nombre completo</label>
                <input
                  type="text"
                  name="nombre"
                  required
                  value={formData.nombre}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground focus:border-accent outline-none transition"
                  placeholder="Tu nombre"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground focus:border-accent outline-none transition"
                    placeholder="tu@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Teléfono</label>
                  <input
                    type="tel"
                    name="telefono"
                    required
                    value={formData.telefono}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground focus:border-accent outline-none transition"
                    placeholder="+34 123 456 789"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Ubicación en el cuerpo</label>
                <input
                  type="text"
                  name="ubicacion"
                  value={formData.ubicacion}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground focus:border-accent outline-none transition"
                  placeholder="Ej: Brazo, pecho, tobillo"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Describe tu idea o diseño</label>
                <textarea
                  name="descripcion"
                  required
                  value={formData.descripcion}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground focus:border-accent outline-none transition"
                  placeholder="Cuéntanos sobre tu tatuaje o piercing ideal..."
                  rows={5}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 py-3 text-base font-semibold flex items-center justify-center gap-2"
              >
                <Send size={20} /> Enviar Cotización
              </Button>
            </form>
          </Card>
        )}
      </div>
    </div>
  )
}
