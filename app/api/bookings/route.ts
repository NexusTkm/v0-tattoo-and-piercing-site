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

    const { serviceId, serviceName, fecha, hora, nombre, email, telefono, descripcion } = body

    if (!serviceId || !serviceName || !fecha || !hora || !nombre || !email || !telefono) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 })
    }

    const { data, error } = await supabase
      .from("bookings")
      .insert([
        {
          service_id: serviceId,
          service_name: serviceName,
          fecha,
          hora,
          nombre,
          email,
          telefono,
          descripcion: descripcion || null,
          estado: "pendiente",
        },
      ])
      .select()

    if (error) {
      console.error("Error al guardar cita:", error)
      return NextResponse.json({ error: "Error al guardar la cita" }, { status: 500 })
    }

    return NextResponse.json(
      {
        success: true,
        message: "Cita reservada exitosamente",
        booking: data[0],
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error en POST /api/bookings:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      cookies: {
        getAll() {
          return []
        },
      },
    })

    const { data, error } = await supabase.from("bookings").select("*").order("fecha", { ascending: false })

    if (error) {
      return NextResponse.json({ error: "Error al obtener citas" }, { status: 500 })
    }

    return NextResponse.json({ bookings: data })
  } catch (error) {
    console.error("Error en GET /api/bookings:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
