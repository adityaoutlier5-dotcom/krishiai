import { NextResponse } from "next/server"

const backendUrl = () =>
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://krishiai-api.onrender.com"
    : "http://127.0.0.1:8000")

async function proxy(request: Request, path: string, method: "GET" | "POST") {
  const headers: Record<string, string> = {}
  const cookie = request.headers.get("cookie")
  if (cookie) headers.cookie = cookie
  if (method === "POST") headers["content-type"] = "application/json"
  try {
    const response = await fetch(`${backendUrl()}/api/testimonials${path}`, {
      method, headers, body: method === "POST" ? await request.text() : undefined, cache: "no-store",
    })
    return new NextResponse(await response.arrayBuffer(), { status: response.status, headers: { "content-type": response.headers.get("content-type") || "application/json" } })
  } catch {
    return NextResponse.json({ detail: "Testimonials service is unavailable." }, { status: 503 })
  }
}

export function GET(request: Request) {
  return proxy(request, new URL(request.url).search, "GET")
}

export function POST(request: Request) {
  return proxy(request, "", "POST")
}
