import { NextResponse } from "next/server"

const backendUrl = () =>
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://krishiai-api.onrender.com"
    : "http://127.0.0.1:8000")

async function proxy(request: Request, id: string, method: "PUT" | "DELETE") {
  const headers: Record<string, string> = {}
  const cookie = request.headers.get("cookie")
  if (cookie) headers.cookie = cookie
  if (method === "PUT") headers["content-type"] = "application/json"
  try {
    const response = await fetch(`${backendUrl()}/api/testimonials/${encodeURIComponent(id)}`, {
      method, headers, body: method === "PUT" ? await request.text() : undefined, cache: "no-store",
    })
    return new NextResponse(await response.arrayBuffer(), { status: response.status, headers: response.headers.get("content-type") ? { "content-type": response.headers.get("content-type")! } : undefined })
  } catch {
    return NextResponse.json({ detail: "Testimonials service is unavailable." }, { status: 503 })
  }
}

export function PUT(request: Request, { params }: { params: { id: string } }) { return proxy(request, params.id, "PUT") }
export function DELETE(request: Request, { params }: { params: { id: string } }) { return proxy(request, params.id, "DELETE") }
