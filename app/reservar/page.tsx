"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, Calendar, Clock, User, Mail, Phone } from "lucide-react"

interface TimeSlot {
  time: string
  available: boolean
}

export default function ReservarCita() {
  const [step, setStep] = useState(1)
  const [selectedService, setSelectedService] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    descripcion: "",
  })

  const services = [
    {
      id: "tatuaje-pequeno",
      name: "Tatuaje Pequeño",
      description: "Hasta 10cm",
      price: "$150 - $300",
    },
    {
      id: "tatuaje-mediano",
      name: "Tatuaje Mediano",
      description: "10cm - 20cm",
      price: "$300 - $600",
    },
    {
      id: "tatuaje-grande",
      name: "Tatuaje Grande",
      description: "Más de 20cm",
      price: "$600+",
    },
    {
      id: "piercing-basico",
      name: "Piercing Básico",
      description: "Orejas y cuerpo",
      price: "$50 - $100",
    },
    {
      id: "piercing-especial",
      name: "Piercing Especial",
      description: "Facial y otras ubicaciones",
      price: "$100 - $200",
    },
    {
      id: "consulta-diseno",
      name: "Consulta de Diseño",
      description: "1 hora de consultoría",
      price: "$50",
    },
  ]

  const timeSlots: TimeSlot[] = [
    { time: "10:00", available: true },
    { time: "11:00", available: true },
    { time: "12:00", available: false },
    { time: "14:00", available: true },
    { time: "15:00", available: true },
    { time: "16:00", available: true },
    { time: "17:00", available: false },
    { time: "18:00", available: true },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({
      service: selectedService,
      date: selectedDate,
      time: selectedTime,
      ...formData,
    })
    alert("Cita reservada exitosamente. Te contactaremos pronto para confirmar.")
    setStep(1)
    setSelectedService("")
  }

  const getNextDates = () => {
    const dates = []
    for (let i = 1; i <= 14; i++) {
      const date = new Date()
      date.setDate(date.getDate() + i)
      if (date.getDay() !== 0) {
        dates.push(date)
      }
    }
    return dates
  }

  return (
    <div className="min-h-screen bg-background pt-20 pb-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-accent hover:text-accent/80 mb-6">
            <ChevronLeft size={20} />
            Volver al inicio
          </Link>
          <h1 className="text-4xl font-bold text-foreground">Reservar Cita</h1>
          <p className="text-muted-foreground mt-2">Selecciona el servicio, fecha y hora que desees</p>
        </div>

        {/* Pasos */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {[1, 2, 3].map((stepNum) => (
            <div key={stepNum} className="flex items-center gap-4">
              <button
                onClick={() => step >= stepNum && setStep(stepNum)}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition ${
                  step === stepNum
                    ? "bg-accent text-accent-foreground"
                    : step > stepNum
                      ? "bg-accent/50 text-accent-foreground"
                      : "bg-secondary text-muted-foreground"
                }`}
              >
                {stepNum}
              </button>
              {stepNum < 3 && <div className={`h-1 w-8 ${step > stepNum ? "bg-accent" : "bg-secondary"}`} />}
            </div>
          ))}
        </div>

        {/* Step 1: Seleccionar Servicio */}
        {step === 1 && (
          <Card className="bg-card border-border p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Selecciona el Servicio</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => {
                    setSelectedService(service.id)
                    setStep(2)
                  }}
                  className={`p-4 rounded-lg border-2 transition text-left ${
                    selectedService === service.id ? "border-accent bg-accent/10" : "border-border hover:border-accent"
                  }`}
                >
                  <h3 className="font-bold text-foreground">{service.name}</h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                  <p className="text-accent font-semibold mt-2">{service.price}</p>
                </button>
              ))}
            </div>
          </Card>
        )}

        {/* Step 2: Seleccionar Fecha y Hora */}
        {step === 2 && (
          <Card className="bg-card border-border p-8">
            <div className="flex items-center gap-4 mb-6">
              <button onClick={() => setStep(1)} className="p-2 hover:bg-secondary rounded-lg transition">
                <ChevronLeft size={20} className="text-foreground" />
              </button>
              <h2 className="text-2xl font-bold text-foreground">Elige Fecha y Hora</h2>
            </div>

            {/* Fechas */}
            <div className="mb-8">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Calendar size={20} /> Selecciona una fecha
              </h3>
              <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
                {getNextDates().map((date) => (
                  <button
                    key={date.toISOString()}
                    onClick={() => setSelectedDate(date.toISOString().split("T")[0])}
                    className={`p-3 rounded-lg border transition text-center text-sm ${
                      selectedDate === date.toISOString().split("T")[0]
                        ? "border-accent bg-accent/10"
                        : "border-border hover:border-accent"
                    }`}
                  >
                    <div className="font-semibold text-foreground">{date.getDate()}</div>
                    <div className="text-xs text-muted-foreground">
                      {date.toLocaleDateString("es-ES", { weekday: "short" })}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Horas */}
            {selectedDate && (
              <div>
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Clock size={20} /> Selecciona una hora
                </h3>
                <div className="grid grid-cols-4 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.time}
                      onClick={() => {
                        if (slot.available) {
                          setSelectedTime(slot.time)
                          setStep(3)
                        }
                      }}
                      disabled={!slot.available}
                      className={`p-3 rounded-lg border transition ${
                        !slot.available
                          ? "opacity-50 cursor-not-allowed border-border"
                          : selectedTime === slot.time
                            ? "border-accent bg-accent/10"
                            : "border-border hover:border-accent cursor-pointer"
                      }`}
                    >
                      <div className="text-foreground font-semibold">{slot.time}</div>
                      {!slot.available && <div className="text-xs text-muted-foreground">Ocupado</div>}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {selectedDate && selectedTime && (
              <Button
                onClick={() => setStep(3)}
                className="w-full mt-8 bg-accent text-accent-foreground hover:bg-accent/90"
              >
                Continuar
              </Button>
            )}
          </Card>
        )}

        {/* Step 3: Formulario */}
        {step === 3 && (
          <Card className="bg-card border-border p-8">
            <div className="flex items-center gap-4 mb-6">
              <button onClick={() => setStep(2)} className="p-2 hover:bg-secondary rounded-lg transition">
                <ChevronLeft size={20} className="text-foreground" />
              </button>
              <h2 className="text-2xl font-bold text-foreground">Información de Contacto</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Resumen */}
              <div className="bg-secondary rounded-lg p-4 space-y-2">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Servicio:</strong>{" "}
                  {services.find((s) => s.id === selectedService)?.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Fecha:</strong>{" "}
                  {new Date(selectedDate).toLocaleDateString("es-ES", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Hora:</strong> {selectedTime}
                </p>
              </div>

              {/* Campos */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                  <User size={16} /> Nombre completo
                </label>
                <input
                  type="text"
                  required
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground focus:border-accent outline-none transition"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Mail size={16} /> Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground focus:border-accent outline-none transition"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Phone size={16} /> Teléfono
                </label>
                <input
                  type="tel"
                  required
                  value={formData.telefono}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground focus:border-accent outline-none transition"
                  placeholder="+34 123 456 789"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Descripción del diseño/ubicación (opcional)
                </label>
                <textarea
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground focus:border-accent outline-none transition"
                  placeholder="Cuéntanos sobre tu idea..."
                  rows={4}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 py-3 text-base font-semibold"
              >
                Confirmar Reserva
              </Button>
            </form>
          </Card>
        )}
      </div>
    </div>
  )
}
