"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  ChevronLeft,
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  Facebook,
  Send,
  MessageCircle,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    asunto: "",
    mensaje: "",
  })

  const [enviado, setEnviado] = useState(false)
  const [errores, setErrores] = useState<Record<string, string>>({})
  const [cargando, setCargando] = useState(false)

  const validarFormulario = () => {
    const nuevosErrores: Record<string, string> = {}

    if (!formData.nombre.trim()) {
      nuevosErrores.nombre = "El nombre es requerido"
    } else if (formData.nombre.length < 3) {
      nuevosErrores.nombre = "El nombre debe tener al menos 3 caracteres"
    }

    if (!formData.email.trim()) {
      nuevosErrores.email = "El email es requerido"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nuevosErrores.email = "Por favor ingresa un email válido"
    }

    if (formData.telefono && !/^\+?[0-9\s\-()]{6,}$/.test(formData.telefono)) {
      nuevosErrores.telefono = "Por favor ingresa un teléfono válido"
    }

    if (!formData.asunto) {
      nuevosErrores.asunto = "Por favor selecciona un asunto"
    }

    if (!formData.mensaje.trim()) {
      nuevosErrores.mensaje = "El mensaje es requerido"
    } else if (formData.mensaje.length < 10) {
      nuevosErrores.mensaje = "El mensaje debe tener al menos 10 caracteres"
    }

    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errores[name]) {
      setErrores((prev) => {
        const nuevos = { ...prev }
        delete nuevos[name]
        return nuevos
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validarFormulario()) {
      return
    }

    setCargando(true)

    setTimeout(() => {
      console.log("Mensaje enviado:", formData)
      setEnviado(true)
      setFormData({
        nombre: "",
        email: "",
        telefono: "",
        asunto: "",
        mensaje: "",
      })
      setCargando(false)

      setTimeout(() => setEnviado(false), 5000)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background pt-20 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-accent hover:text-accent/80 mb-6 transition">
            <ChevronLeft size={20} />
            Volver al inicio
          </Link>
          <h1 className="text-4xl font-bold text-foreground">Contacto y Ubicación</h1>
          <p className="text-muted-foreground mt-2">Encuéntranos y ponte en contacto. Estamos listos para ayudarte</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Información de Contacto */}
          <div className="lg:col-span-1 space-y-6">
            {/* Ubicación */}
            <Card className="bg-card border-border p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <MapPin className="text-accent" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-foreground mb-2">Ubicación</h3>
                  <p className="text-muted-foreground text-sm">Calle Principal 123</p>
                  <p className="text-muted-foreground text-sm">Barrio Centro</p>
                  <p className="text-muted-foreground text-sm">28001 Madrid, España</p>
                  <Link
                    href="https://maps.google.com"
                    target="_blank"
                    className="text-accent text-sm mt-2 hover:underline inline-block"
                  >
                    Ver en Google Maps →
                  </Link>
                </div>
              </div>
            </Card>

            {/* Teléfono */}
            <Card className="bg-card border-border p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <Phone className="text-accent" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-foreground mb-2">Teléfono</h3>
                  <p className="text-muted-foreground text-sm">+34 (91) 123-4567</p>
                  <p className="text-muted-foreground text-sm">+34 (91) 123-4568</p>
                  <Link href="tel:+34911234567" className="text-accent text-sm mt-2 hover:underline inline-block">
                    Llamar ahora →
                  </Link>
                </div>
              </div>
            </Card>

            {/* Email */}
            <Card className="bg-card border-border p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <Mail className="text-accent" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-foreground mb-2">Email</h3>
                  <p className="text-muted-foreground text-sm break-all">info@tattstudio.com</p>
                  <p className="text-muted-foreground text-sm break-all">reservas@tattstudio.com</p>
                  <Link
                    href="mailto:info@tattstudio.com"
                    className="text-accent text-sm mt-2 hover:underline inline-block"
                  >
                    Enviar email →
                  </Link>
                </div>
              </div>
            </Card>

            {/* Horario */}
            <Card className="bg-card border-border p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <Clock className="text-accent" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-foreground mb-2">Horario</h3>
                  <ul className="text-muted-foreground text-sm space-y-1">
                    <li>
                      <strong className="text-foreground">Lunes - Viernes:</strong>
                    </li>
                    <li className="ml-4">11:00 - 14:00</li>
                    <li className="ml-4">16:00 - 20:00</li>
                    <li className="mt-2">
                      <strong className="text-foreground">Sábado:</strong> 10:00 - 22:00
                    </li>
                    <li>
                      <strong className="text-foreground">Domingo:</strong> Cerrado
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Redes Sociales */}
            <Card className="bg-card border-border p-6">
              <h3 className="font-bold text-foreground mb-4">Síguenos</h3>
              <div className="flex gap-3">
                <Link
                  href="https://instagram.com"
                  target="_blank"
                  className="p-3 bg-accent/10 hover:bg-accent/20 rounded-lg text-accent transition"
                >
                  <Instagram size={20} />
                </Link>
                <Link
                  href="https://facebook.com"
                  target="_blank"
                  className="p-3 bg-accent/10 hover:bg-accent/20 rounded-lg text-accent transition"
                >
                  <Facebook size={20} />
                </Link>
                <Link
                  href="https://whatsapp.com"
                  target="_blank"
                  className="p-3 bg-accent/10 hover:bg-accent/20 rounded-lg text-accent transition"
                >
                  <MessageCircle size={20} />
                </Link>
              </div>
            </Card>
          </div>

          {/* Mapa y Formulario */}
          <div className="lg:col-span-2 space-y-8">
            {/* Mapa */}
            <Card className="bg-card border-border overflow-hidden h-96">
              <div className="w-full h-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-accent/30 mx-auto mb-4" />
                  <p className="text-muted-foreground">Mapa interactivo - Calle Principal 123</p>
                  <Link
                    href="https://maps.google.com"
                    target="_blank"
                    className="text-accent mt-2 hover:underline block"
                  >
                    Ver mapa completo →
                  </Link>
                </div>
              </div>
            </Card>

            {/* Formulario Mejorado */}
            <Card className="bg-card border-border p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Envíanos un Mensaje</h2>

              {enviado ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="text-green-600" size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">¡Mensaje Enviado Exitosamente!</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Gracias por tu mensaje. Nuestro equipo de Black Ink Tattoo se pondrá en contacto contigo lo antes
                    posible, generalmente dentro de 24 horas.
                  </p>
                  <Button
                    onClick={() => setEnviado(false)}
                    className="mt-6 rounded-full bg-accent text-accent-foreground hover:bg-accent/90"
                  >
                    Enviar otro mensaje
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Nombre */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Nombre completo</label>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-2xl bg-secondary/20 border-2 transition focus:outline-none ${
                        errores.nombre ? "border-red-500 focus:border-red-500" : "border-border focus:border-accent"
                      } text-foreground placeholder:text-muted-foreground`}
                      placeholder="Tu nombre completo"
                    />
                    {errores.nombre && (
                      <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                        <AlertCircle size={16} />
                        {errores.nombre}
                      </div>
                    )}
                  </div>

                  {/* Email y Teléfono */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-2xl bg-secondary/20 border-2 transition focus:outline-none ${
                          errores.email ? "border-red-500 focus:border-red-500" : "border-border focus:border-accent"
                        } text-foreground placeholder:text-muted-foreground`}
                        placeholder="tu@email.com"
                      />
                      {errores.email && (
                        <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                          <AlertCircle size={16} />
                          {errores.email}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Teléfono</label>
                      <input
                        type="tel"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-2xl bg-secondary/20 border-2 transition focus:outline-none ${
                          errores.telefono ? "border-red-500 focus:border-red-500" : "border-border focus:border-accent"
                        } text-foreground placeholder:text-muted-foreground`}
                        placeholder="+34 123 456 789"
                      />
                      {errores.telefono && (
                        <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                          <AlertCircle size={16} />
                          {errores.telefono}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Asunto */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Asunto</label>
                    <select
                      name="asunto"
                      value={formData.asunto}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-2xl bg-secondary/20 border-2 transition focus:outline-none ${
                        errores.asunto ? "border-red-500 focus:border-red-500" : "border-border focus:border-accent"
                      } text-foreground`}
                    >
                      <option value="">Selecciona un asunto</option>
                      <option value="consulta">Consulta general</option>
                      <option value="reserva">Problema con reserva</option>
                      <option value="producto">Pregunta sobre productos</option>
                      <option value="diseno">Idea de diseño</option>
                      <option value="otro">Otro</option>
                    </select>
                    {errores.asunto && (
                      <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                        <AlertCircle size={16} />
                        {errores.asunto}
                      </div>
                    )}
                  </div>

                  {/* Mensaje */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Mensaje <span className="text-muted-foreground text-xs">({formData.mensaje.length}/500)</span>
                    </label>
                    <textarea
                      name="mensaje"
                      value={formData.mensaje}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-2xl bg-secondary/20 border-2 transition focus:outline-none resize-none ${
                        errores.mensaje ? "border-red-500 focus:border-red-500" : "border-border focus:border-accent"
                      } text-foreground placeholder:text-muted-foreground`}
                      placeholder="Cuéntanos detalles sobre tu solicitud..."
                      rows={6}
                      maxLength={500}
                    />
                    {errores.mensaje && (
                      <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                        <AlertCircle size={16} />
                        {errores.mensaje}
                      </div>
                    )}
                  </div>

                  {/* Botón Enviar */}
                  <Button
                    type="submit"
                    disabled={cargando}
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90 disabled:bg-muted disabled:cursor-not-allowed py-3 text-base font-semibold flex items-center justify-center gap-2 rounded-full transition"
                  >
                    {cargando ? (
                      <>
                        <div className="w-5 h-5 border-2 border-accent-foreground border-t-transparent rounded-full animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send size={20} /> Enviar Mensaje
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    Responderemos a tu mensaje dentro de 24 horas hábiles
                  </p>
                </form>
              )}
            </Card>
          </div>
        </div>

        {/* FAQ */}
        <Card className="bg-secondary border-border p-8">
          <h2 className="text-2xl font-bold text-foreground mb-8">Preguntas Frecuentes</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-foreground mb-2">¿Cuánto cuesta un tatuaje?</h3>
              <p className="text-muted-foreground text-sm">
                Nuestros precios varían según el tamaño, complejidad y estilo. Revisa nuestra página de cotizaciones
                para más información.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-foreground mb-2">¿Necesito consulta previa?</h3>
              <p className="text-muted-foreground text-sm">
                Recomendamos una consulta para discutir tu diseño. Puedes reservar una cita desde nuestra plataforma.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-foreground mb-2">¿Hacen tatuajes personalizados?</h3>
              <p className="text-muted-foreground text-sm">
                Sí, todos nuestros tatuajes son personalizados. Trabajamos con tu idea para crear algo único.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-foreground mb-2">¿Cuál es el tiempo de cicatrización?</h3>
              <p className="text-muted-foreground text-sm">
                Generalmente entre 2-4 semanas. Proporcionamos instrucciones detalladas de cuidado.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-foreground mb-2">¿Aceptan menores?</h3>
              <p className="text-muted-foreground text-sm">
                Tatuajes: mayores de 18 años con ID. Piercings: a partir de 14 con consentimiento parental.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-foreground mb-2">¿Hacen removals/cover-ups?</h3>
              <p className="text-muted-foreground text-sm">
                Sí, tenemos experiencia en reparación y cubrimiento de tatuajes. Consulta con nuestros artistas.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
