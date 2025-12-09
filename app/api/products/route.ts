import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

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

    const { data, error } = await supabase.from("products").select("*").order("categoria")

    if (error) {
      return NextResponse.json({ error: "Error al obtener productos" }, { status: 500 })
    }

    return NextResponse.json({ products: data })
  } catch (error) {
    console.error("Error en GET /api/products:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
