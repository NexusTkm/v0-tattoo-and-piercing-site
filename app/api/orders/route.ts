import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
      },
    })

    const body = await request.json()
    const { nombre, email, telefono, cart, total, notas } = body

    if (!nombre || !email || !cart || cart.length === 0 || !total) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 })
    }

    const { data: orderData, error: orderError } = await supabase
      .from("orders")
      .insert([
        {
          nombre,
          email,
          telefono: telefono || null,
          total: Number.parseFloat(total),
          cantidad_items: cart.reduce((sum: number, item: any) => sum + item.cantidad, 0),
          notas: notas || null,
          estado: "pendiente",
        },
      ])
      .select()

    if (orderError) {
      console.error("Error al crear orden:", orderError)
      return NextResponse.json({ error: "Error al crear la orden" }, { status: 500 })
    }

    const orderId = orderData[0].id

    const orderItems = cart.map((item: any) => ({
      order_id: orderId,
      product_id: item.id,
      nombre: item.nombre,
      precio: item.precio,
      cantidad: item.cantidad,
      subtotal: item.precio * item.cantidad,
    }))

    const { error: itemsError } = await supabase.from("order_items").insert(orderItems)

    if (itemsError) {
      console.error("Error al insertar items:", itemsError)
      return NextResponse.json({ error: "Error al guardar los items" }, { status: 500 })
    }

    return NextResponse.json(
      {
        success: true,
        message: "Orden creada exitosamente",
        order: orderData[0],
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error en POST /api/orders:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies()
    const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
      },
    })

    const { data, error } = await supabase
      .from("orders")
      .select(
        `
      *,
      order_items (*)
    `,
      )
      .order("created_at", { ascending: false })

    if (error) {
      return NextResponse.json({ error: "Error al obtener órdenes" }, { status: 500 })
    }

    return NextResponse.json({ orders: data })
  } catch (error) {
    console.error("Error en GET /api/orders:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
