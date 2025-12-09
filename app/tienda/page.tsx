"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ShoppingCart, Search, X, Plus, Minus, Loader } from "lucide-react"

interface CartItem {
  id: string
  nombre: string
  precio: number
  cantidad: number
  imagen: string
}

interface Producto {
  id: string
  nombre: string
  categoria: string
  precio: number
  descripcion: string
  stock: number
  imagen: string
}

export default function Tienda() {
  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState("todas")
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [showCheckout, setShowCheckout] = useState(false)
  const [checkoutData, setCheckoutData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    notas: "",
  })

  const productos: Producto[] = [
    // Tintas
    {
      id: "tinta-negra-pro",
      nombre: "Tinta Negra Profesional",
      categoria: "tintas",
      precio: 25,
      descripcion: "Tinta negra de alta pigmentación para líneas perfectas",
      stock: 15,
      imagen: "tinta-negra",
    },
    {
      id: "tinta-color-rojo",
      nombre: "Tinta Color Rojo",
      categoria: "tintas",
      precio: 28,
      descripcion: "Rojo brillante y duradero. Disponible en 2 tonalidades",
      stock: 10,
      imagen: "tinta-rojo",
    },
    {
      id: "tinta-color-azul",
      nombre: "Tinta Color Azul",
      categoria: "tintas",
      precio: 28,
      descripcion: "Azul profundo para tatuajes vibrantes",
      stock: 12,
      imagen: "tinta-azul",
    },
    {
      id: "tinta-color-blanco",
      nombre: "Tinta Color Blanco",
      categoria: "tintas",
      precio: 30,
      descripcion: "Blanco opaco. Ideal para detalles",
      stock: 8,
      imagen: "tinta-blanco",
    },
    {
      id: "tinta-pack-colores",
      nombre: "Pack 10 Colores",
      categoria: "tintas",
      precio: 199,
      descripcion: "Set completo de colores básicos. Excelente relación precio-valor",
      stock: 5,
      imagen: "pack-colores",
    },

    // Agujas
    {
      id: "aguja-liner-3rl",
      nombre: "Aguja Liner 3RL",
      categoria: "agujas",
      precio: 5,
      descripcion: "Aguja de 3 round liner. Perfecta para líneas",
      stock: 30,
      imagen: "aguja-liner",
    },
    {
      id: "aguja-shader-5rs",
      nombre: "Aguja Shader 5RS",
      categoria: "agujas",
      precio: 5.5,
      descripcion: "Aguja de 5 round shader para sombreado",
      stock: 25,
      imagen: "aguja-shader",
    },
    {
      id: "aguja-pack-mixto",
      nombre: "Pack Agujas Sortidas",
      categoria: "agujas",
      precio: 35,
      descripcion: "Pack de 10 agujas variadas (liners y shaders)",
      stock: 12,
      imagen: "pack-agujas",
    },

    // Equipos
    {
      id: "fuente-poder",
      nombre: "Fuente de Poder Professional",
      categoria: "equipos",
      precio: 450,
      descripcion: "Control de voltaje digital. LED display. 150W",
      stock: 3,
      imagen: "fuente-poder",
    },
    {
      id: "grip-aluminio",
      nombre: "Grip de Aluminio",
      categoria: "equipos",
      precio: 120,
      descripcion: "Grip de calidad profesional. Peso equilibrado",
      stock: 7,
      imagen: "grip-aluminio",
    },

    // Cuidado
    {
      id: "balm-cicatrizacion",
      nombre: "Balm de Cicatrización",
      categoria: "cuidado",
      precio: 18,
      descripcion: "Crema especializada para cicatrización rápida",
      stock: 20,
      imagen: "balm",
    },
    {
      id: "limpiador-tattoo",
      nombre: "Limpiador para Tatuajes",
      categoria: "cuidado",
      precio: 15,
      descripcion: "Limpieza suave y efectiva durante la cicatrización",
      stock: 18,
      imagen: "limpiador",
    },
    {
      id: "protector-solar",
      nombre: "Protector Solar SPF 50",
      categoria: "cuidado",
      precio: 22,
      descripcion: "Protección UV para mantener los colores",
      stock: 14,
      imagen: "protector-solar",
    },

    // Joyería
    {
      id: "piercing-acero-quirurgico",
      nombre: "Piercing Acero Quirúrgico Bola",
      categoria: "joyeria",
      precio: 12,
      descripcion: "Acero quirúrgico 316L. Hypoalergénico",
      stock: 40,
      imagen: "piercing-bola",
    },
    {
      id: "piercing-cristal",
      nombre: "Piercing Cristal de Zirconia",
      categoria: "joyeria",
      precio: 35,
      descripcion: "Brilla como diamante. Acero 316L",
      stock: 25,
      imagen: "piercing-cristal",
    },
    {
      id: "piercing-oro",
      nombre: "Piercing Chapado en Oro",
      categoria: "joyeria",
      precio: 45,
      descripcion: "Chapado en oro 18k. Elegante y duradero",
      stock: 15,
      imagen: "piercing-oro",
    },
    {
      id: "argolla-titanio",
      nombre: "Argolla de Titanio",
      categoria: "joyeria",
      precio: 25,
      descripcion: "Titanio puro. Ideal para piercings nuevos",
      stock: 20,
      imagen: "argolla-titanio",
    },
  ]

  const categorias = ["todas", "tintas", "agujas", "equipos", "cuidado", "joyeria"]

  const productosFiltered = productos.filter((p) => {
    const matchCategory = selectedCategory === "todas" || p.categoria === selectedCategory
    const matchSearch = p.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    return matchCategory && matchSearch
  })

  const addToCart = (producto: Producto) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === producto.id)
      if (existingItem) {
        return prevCart.map((item) => (item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item))
      } else {
        return [
          ...prevCart,
          {
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: 1,
            imagen: producto.imagen,
          },
        ]
      }
    })
  }

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: string, cantidad: number) => {
    if (cantidad <= 0) {
      removeFromCart(id)
    } else {
      setCart((prevCart) => prevCart.map((item) => (item.id === id ? { ...item, cantidad } : item)))
    }
  }

  const cartTotal = cart.reduce((sum, item) => sum + item.precio * item.cantidad, 0)
  const cartCount = cart.reduce((sum, item) => sum + item.cantidad, 0)

  const handleCheckout = () => {
    setShowCheckout(true)
  }

  const handleCheckoutSubmit = () => {
    setIsLoading(true)
    // Simulate a checkout process
    setTimeout(() => {
      setIsLoading(false)
      setMessage({ type: "success", text: "Compra realizada con éxito" })
      setCart([])
      setShowCheckout(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background pt-20 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-accent hover:text-accent/80 mb-6">
              <ChevronLeft size={20} />
              Volver al inicio
            </Link>
            <h1 className="text-4xl font-bold text-foreground">Tienda</h1>
            <p className="text-muted-foreground mt-2">Tintas, equipos y productos de calidad premium</p>
          </div>
          <button
            onClick={() => setCartOpen(!cartOpen)}
            className="relative p-4 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition"
          >
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-destructive text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Carrito Abierto */}
        {cartOpen && (
          <Card className="bg-card border-border p-6 mb-8 sticky top-24 z-40">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Tu Carrito</h2>
              <button onClick={() => setCartOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X size={24} />
              </button>
            </div>

            {cart.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">Tu carrito está vacío</p>
            ) : (
              <>
                <div className="space-y-4 mb-6 max-h-80 overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{item.nombre}</h3>
                        <p className="text-accent font-bold">${item.precio}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.cantidad - 1)}
                          className="p-1 hover:bg-border rounded"
                        >
                          <Minus size={16} className="text-foreground" />
                        </button>
                        <span className="w-8 text-center text-foreground font-semibold">{item.cantidad}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.cantidad + 1)}
                          className="p-1 hover:bg-border rounded"
                        >
                          <Plus size={16} />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ml-2 p-1 hover:bg-destructive/20 text-destructive rounded"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-lg font-semibold text-foreground">Total:</span>
                    <span className="text-2xl font-bold text-accent">${cartTotal.toFixed(2)}</span>
                  </div>
                  <Button
                    onClick={handleCheckout}
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90 py-3 font-semibold"
                  >
                    Proceder al Pago
                  </Button>
                </div>
              </>
            )}
          </Card>
        )}

        {/* Checkout */}
        {showCheckout && (
          <Card className="bg-card border-border p-6 mb-8 sticky top-24 z-40">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Checkout</h2>
              <button onClick={() => setShowCheckout(false)} className="text-muted-foreground hover:text-foreground">
                <X size={24} />
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label htmlFor="nombre" className="text-sm font-semibold text-foreground">
                  Nombre
                </label>
                <input
                  type="text"
                  id="nombre"
                  value={checkoutData.nombre}
                  onChange={(e) => setCheckoutData({ ...checkoutData, nombre: e.target.value })}
                  className="w-full pl-4 pr-4 py-3 rounded-lg bg-secondary border border-border text-foreground focus:border-accent outline-none"
                />
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-semibold text-foreground">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={checkoutData.email}
                  onChange={(e) => setCheckoutData({ ...checkoutData, email: e.target.value })}
                  className="w-full pl-4 pr-4 py-3 rounded-lg bg-secondary border border-border text-foreground focus:border-accent outline-none"
                />
              </div>
              <div>
                <label htmlFor="telefono" className="text-sm font-semibold text-foreground">
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="telefono"
                  value={checkoutData.telefono}
                  onChange={(e) => setCheckoutData({ ...checkoutData, telefono: e.target.value })}
                  className="w-full pl-4 pr-4 py-3 rounded-lg bg-secondary border border-border text-foreground focus:border-accent outline-none"
                />
              </div>
              <div>
                <label htmlFor="notas" className="text-sm font-semibold text-foreground">
                  Notas
                </label>
                <textarea
                  id="notas"
                  value={checkoutData.notas}
                  onChange={(e) => setCheckoutData({ ...checkoutData, notas: e.target.value })}
                  className="w-full pl-4 pr-4 py-3 rounded-lg bg-secondary border border-border text-foreground focus:border-accent outline-none"
                />
              </div>

              <Button
                onClick={handleCheckoutSubmit}
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 py-3 font-semibold"
                disabled={isLoading}
              >
                {isLoading ? <Loader size={24} /> : "Finalizar Compra"}
              </Button>
            </form>

            {message && (
              <div
                className={`mt-4 p-4 rounded-lg ${message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
              >
                {message.text}
              </div>
            )}
          </Card>
        )}

        {/* Búsqueda y Filtros */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-secondary border border-border text-foreground focus:border-accent outline-none"
              />
            </div>
          </div>

          {/* Categorías */}
          <div className="flex flex-wrap gap-3 mt-6">
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
                {cat === "todas" ? "Todos los productos" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de Productos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {productosFiltered.map((producto) => (
            <Card
              key={producto.id}
              className="bg-card border-border hover:border-accent transition overflow-hidden flex flex-col"
            >
              {/* Imagen */}
              <div className="aspect-square bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center overflow-hidden">
                <div className="text-4xl text-accent/30">📦</div>
              </div>

              {/* Contenido */}
              <div className="p-4 flex flex-col flex-1">
                <p className="text-xs uppercase tracking-wide text-accent font-semibold mb-2">{producto.categoria}</p>
                <h3 className="font-bold text-foreground mb-2 flex-grow">{producto.nombre}</h3>
                <p className="text-sm text-muted-foreground mb-4">{producto.descripcion}</p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                  <p className="text-2xl font-bold text-accent">${producto.precio}</p>
                  {producto.stock > 0 ? (
                    <Button
                      onClick={() => addToCart(producto)}
                      size="sm"
                      className="bg-accent text-accent-foreground hover:bg-accent/90"
                    >
                      Agregar
                    </Button>
                  ) : (
                    <span className="text-xs text-destructive font-semibold">Agotado</span>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {productosFiltered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No se encontraron productos</p>
          </div>
        )}
      </div>
    </div>
  )
}
