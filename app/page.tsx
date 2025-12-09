"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Menu, X, Sparkles, ShoppingCart, MapPin, Phone, Mail, Star, Award } from "lucide-react"
import { useState } from "react"

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="fixed w-full top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link href="/" className="text-3xl font-black text-primary tracking-tight">
            BLACK INK
          </Link>

          {/* Menu Desktop */}
          <div className="hidden md:flex gap-12 items-center">
            <Link href="/#artistas" className="text-foreground hover:text-accent transition font-medium text-sm">
              Artistas
            </Link>
            <Link href="/#servicios" className="text-foreground hover:text-accent transition font-medium text-sm">
              Servicios
            </Link>
            <Link href="/#galeria" className="text-foreground hover:text-accent transition font-medium text-sm">
              Galería
            </Link>
            <Link href="/tienda" className="text-foreground hover:text-accent transition font-medium text-sm">
              Tienda
            </Link>
            <button className="btn-primary text-sm">
              <Link href="/reservar">Reservar Cita</Link>
            </button>
          </div>

          {/* Menu Mobile */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-foreground">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Menu Móvil Expandido */}
        {menuOpen && (
          <div className="md:hidden border-t border-border bg-background p-6 space-y-4">
            <Link href="/#artistas" className="block text-foreground hover:text-accent font-medium">
              Artistas
            </Link>
            <Link href="/#servicios" className="block text-foreground hover:text-accent font-medium">
              Servicios
            </Link>
            <Link href="/#galeria" className="block text-foreground hover:text-accent font-medium">
              Galería
            </Link>
            <Link href="/tienda" className="block text-foreground hover:text-accent font-medium">
              Tienda
            </Link>
            <button className="btn-primary w-full text-sm">
              <Link href="/reservar">Reservar Cita</Link>
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section with Improved Background */}
      <section className="pt-40 pb-24 px-6 min-h-screen flex items-center relative overflow-hidden bg-gradient-to-br from-background via-background to-[#f0eae0]">
        {/* Fondo decorativo sutil con patrón de tatuajes */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="tattoo-pattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.3" />
                <path
                  d="M 100 20 Q 150 50 100 100 Q 50 50 100 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  opacity="0.2"
                />
                <path d="M 50 100 L 150 100" stroke="currentColor" strokeWidth="1" opacity="0.2" />
              </pattern>
            </defs>
            <rect width="1200" height="600" fill="url(#tattoo-pattern)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center relative z-10">
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-7xl md:text-8xl font-black text-primary leading-tight tracking-tighter">
                Arte en tu piel
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-md">
                Diseños personalizados creados por artistas premiados con más de 15 años de experiencia en tatuajes y
                piercings de lujo.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button className="btn-primary text-base">
                <Link href="/reservar">Agendar Cita</Link>
              </button>
              <button className="btn-secondary text-base">
                <Link href="/#galeria">Ver Trabajos</Link>
              </button>
            </div>
          </div>
          <div className="hidden md:flex justify-center">
            <div className="aspect-square w-full max-w-md rounded-3xl overflow-hidden border-4 border-primary shadow-2xl bg-white">
              <img
                src="/estudio-profesional-de-tatuajes-moderno-elegante-c.jpg"
                alt="Black Ink Tattoo Studio"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="artistas" className="py-24 px-6 bg-primary text-primary-foreground">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-6xl font-black mb-6">Nuestros Artistas</h2>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              Maestros del arte corporal con reconocimiento internacional y pasión por la excelencia
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Carlos Mendoza",
                specialty: "Tatuaje Realista",
                awards: "Ganador Tattoo Masters 2023",
              },
              {
                name: "Marina Rossi",
                specialty: "Diseño Personalizado",
                awards: "Top 10 Artistas América Latina",
              },
              {
                name: "David Punk",
                specialty: "Piercings & Joyería",
                awards: "Certificado Internacional AAP",
              },
            ].map((artist, i) => (
              <div
                key={i}
                className="bg-primary-foreground text-foreground rounded-3xl p-8 text-center hover:shadow-2xl transition duration-300"
              >
                <div className="w-24 h-24 bg-accent rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Award className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{artist.name}</h3>
                <p className="text-accent font-semibold mb-3">{artist.specialty}</p>
                <div className="flex items-center justify-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">{artist.awards}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="servicios" className="py-24 px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-6xl font-black text-center mb-20">Servicios Premium</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Tatuajes",
                description: "Desde minimalistas hasta obras maestras complejas",
                features: ["Diseño personalizado", "Tinta premium importada", "Artistas premiados"],
                icon: Sparkles,
              },
              {
                title: "Piercings",
                description: "Piercings profesionales seguros y estériles",
                features: ["Equipos certificados", "Joyería premium", "Asesoramiento profesional"],
                icon: Award,
              },
              {
                title: "Tienda",
                description: "Productos profesionales para artistas y aficionados",
                features: ["Tintas certificadas", "Agujas esterilizadas", "Joyería exclusiva"],
                icon: ShoppingCart,
              },
            ].map((service, i) => {
              const Icon = service.icon
              return (
                <Card
                  key={i}
                  className="bg-card border-2 border-border rounded-3xl p-10 hover:border-accent hover:shadow-xl transition duration-300 group"
                >
                  <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4 text-primary">{service.title}</h3>
                  <p className="text-muted-foreground mb-8 leading-relaxed">{service.description}</p>
                  <ul className="space-y-3">
                    {service.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-3 text-foreground">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Improved Gallery Section */}
      <section id="galeria" className="py-24 px-6 bg-gradient-to-b from-background to-[#f5f1ed]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-6xl font-black mb-6 text-primary">Galería de Trabajos</h2>
            <p className="text-xl text-muted-foreground">Descubre la maestría de nuestros artistas en cada proyecto</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Tatuaje Realista", style: "tatuaje realista retrato detallado en blanco y negro profesional" },
              { title: "Mandala Geométrico", style: "tatuaje mandala geométrico detallado intrincado profesional" },
              { title: "Flor Japonesa", style: "tatuaje flor sakura japonesa a color vibrante detallado" },
              { title: "Líneas Minimalistas", style: "tatuaje artístico líneas negras elegantes minimalista" },
              { title: "Joyería Premium", style: "piercing premium acero quirúrgico con diamantes joyería" },
              { title: "Geométrico Moderno", style: "tatuaje geométrico moderno triángulos círculos profesional" },
            ].map((item, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-square bg-card rounded-3xl border-3 border-border overflow-hidden hover:border-primary transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                  <img
                    src={`/.jpg?key=eio62&height=400&width=400&query=${encodeURIComponent(item.style)}`}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                <h3 className="text-lg font-bold text-primary mt-4 group-hover:text-accent transition">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <h2 className="text-6xl font-black">Transforma tu cuerpo en arte</h2>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">
            Agendar una cita es simple. Cuéntanos tu visión y nuestros artistas la harán realidad.
          </p>
          <button className="btn-primary bg-accent text-primary hover:shadow-xl text-lg">
            <Link href="/reservar">Reservar Ahora</Link>
          </button>
        </div>
      </section>

      <footer className="border-t-2 border-border bg-background py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div>
              <h3 className="text-2xl font-black mb-6 text-primary">BLACK INK</h3>
              <p className="text-muted-foreground leading-relaxed">
                Donde el arte corporal y la excelencia profesional se encuentran para crear obras maestras permanentes.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-primary mb-6 text-lg">Navegación</h4>
              <ul className="space-y-3 text-muted-foreground text-sm">
                <li>
                  <Link href="/#artistas" className="hover:text-accent transition font-medium">
                    Artistas
                  </Link>
                </li>
                <li>
                  <Link href="/#servicios" className="hover:text-accent transition font-medium">
                    Servicios
                  </Link>
                </li>
                <li>
                  <Link href="/#galeria" className="hover:text-accent transition font-medium">
                    Galería
                  </Link>
                </li>
                <li>
                  <Link href="/tienda" className="hover:text-accent transition font-medium">
                    Tienda
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-primary mb-6 text-lg">Contacto</h4>
              <div className="space-y-4 text-muted-foreground text-sm">
                <p className="flex items-center gap-3">
                  <MapPin size={18} className="text-accent" /> Calle Principal 123, Madrid
                </p>
                <p className="flex items-center gap-3">
                  <Phone size={18} className="text-accent" /> +34 123 456 789
                </p>
                <p className="flex items-center gap-3">
                  <Mail size={18} className="text-accent" /> info@blackink.com
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-primary mb-6 text-lg">Horario</h4>
              <ul className="text-muted-foreground text-sm space-y-2">
                <li>
                  <span className="font-bold text-foreground">Lun - Vie:</span> 11:00 - 20:00
                </li>
                <li>
                  <span className="font-bold text-foreground">Sábado:</span> 10:00 - 22:00
                </li>
                <li>
                  <span className="font-bold text-foreground">Domingo:</span> Cerrado
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-muted-foreground text-sm">
            <p>&copy; 2025 Black Ink Tattoo. Todos los derechos reservados. Diseño y arte por profesionales.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
