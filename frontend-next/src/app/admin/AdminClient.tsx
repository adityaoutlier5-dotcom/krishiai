"use client"

import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { BarChart3, FileText, ImagePlus, Loader2, ScrollText, Users } from "lucide-react"
import { fetchWithAuth } from "@/lib/auth"

type Overview = { total_users: number; new_users_7d: number; active_sessions: number; active_users_24h: number; otp_requests_24h: number; otp_verified_24h: number; otp_failed_24h: number; feature_events_7d: number; language_usage: { language: string; count: number }[] }
type Content = { id: number; locale: string; key: string; value: string; is_published: boolean; updated_at: string }
type User = { id: number; name?: string; email?: string; role: string; is_active: boolean; created_at: string }
type Audit = { id: number; user_id?: number; activity_type: string; details: string; logged_at: string }
type Media = { id: number; filename: string; size_bytes: number }
type Tab = "overview" | "content" | "media" | "users" | "audit"

const contentSuggestions = ["hero.title", "hero.subtitle", "hero.start_free", "featuresBadge", "featuresTitle1", "featuresTitle2", "landing_features.access_highly_accurate_agricultural", "features.0.title", "features.0.body"]

async function api<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetchWithAuth(`/api/admin${path}`, options)
  if (!response.ok) {
    const body = await response.json().catch(() => ({}))
    throw new Error(body.detail || "The owner portal request could not be completed.")
  }
  return response.status === 204 ? undefined as T : response.json()
}

export default function AdminClient() {
  const [tab, setTab] = useState<Tab>("overview")
  const [overview, setOverview] = useState<Overview | null>(null)
  const [content, setContent] = useState<Content[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [audit, setAudit] = useState<Audit[]>([])
  const [media, setMedia] = useState<Media[]>([])
  const [loading, setLoading] = useState(true)
  const [notice, setNotice] = useState<string | null>(null)
  const [form, setForm] = useState({ locale: "en", key: "hero.title", value: "", is_published: true })
  const [file, setFile] = useState<File | null>(null)

  const load = async () => {
    setLoading(true)
    try {
      const [nextOverview, nextContent, nextUsers, nextAudit, nextMedia] = await Promise.all([
        api<Overview>("/overview"), api<Content[]>("/content"), api<User[]>("/users"), api<Audit[]>("/audit-logs"), api<Media[]>("/media"),
      ])
      setOverview(nextOverview); setContent(nextContent); setUsers(nextUsers); setAudit(nextAudit); setMedia(nextMedia)
    } catch (error) { setNotice(error instanceof Error ? error.message : "Unable to load private portal data.") }
    finally { setLoading(false) }
  }
  useEffect(() => { void load() }, [])

  const saveContent = async (event: FormEvent) => {
    event.preventDefault(); setNotice(null)
    try {
      await api(`/content/${encodeURIComponent(form.locale)}/${form.key}`, { method: "PUT", body: JSON.stringify({ value: form.value, is_published: form.is_published }) })
      setNotice("Content saved. Published copy will load on the public site for that language."); await load()
    } catch (error) { setNotice(error instanceof Error ? error.message : "Could not save content.") }
  }
  const upload = async (event: FormEvent) => {
    event.preventDefault(); if (!file) return
    const data = new FormData(); data.append("file", file)
    try { await api("/media", { method: "POST", body: data, headers: {} }); setFile(null); setNotice("Image uploaded."); await load() }
    catch (error) { setNotice(error instanceof Error ? error.message : "Could not upload image.") }
  }
  const removeMedia = async (id: number) => {
    if (!window.confirm("Delete this uploaded image permanently?")) return
    try { await api(`/media/${id}`, { method: "DELETE" }); setNotice("Image removed."); await load() }
    catch (error) { setNotice(error instanceof Error ? error.message : "Could not remove image.") }
  }

  const tabs: { id: Tab; label: string; icon: typeof BarChart3 }[] = [
    { id: "overview", label: "Overview", icon: BarChart3 }, { id: "content", label: "Content", icon: FileText }, { id: "media", label: "Media", icon: ImagePlus }, { id: "users", label: "Users", icon: Users }, { id: "audit", label: "Audit logs", icon: ScrollText },
  ]
  const cards = overview ? [["Total users", overview.total_users], ["New users (7 days)", overview.new_users_7d], ["Active sessions", overview.active_sessions], ["Active users (24 hours)", overview.active_users_24h], ["OTP requests (24 hours)", overview.otp_requests_24h], ["OTP verified (24 hours)", overview.otp_verified_24h], ["OTP failed (24 hours)", overview.otp_failed_24h], ["Feature events (7 days)", overview.feature_events_7d]] : []

  return <section className="mx-auto max-w-6xl py-2">
    <div className="mb-7 border-b border-border pb-5"><p className="text-xs font-semibold uppercase tracking-[.18em] text-primary">Private owner portal</p><h1 className="mt-2 text-3xl font-semibold text-foreground">Manage KisaanBuddy</h1><p className="mt-2 text-sm text-muted-foreground">Only server-authorized owners can view or change this data.</p></div>
    <div className="mb-6 flex flex-wrap gap-2">{tabs.map(({ id, label, icon: Icon }) => <button key={id} onClick={() => setTab(id)} className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${tab === id ? "bg-primary text-primary-foreground" : "border border-border bg-card text-foreground hover:bg-muted"}`}><Icon className="h-4 w-4" />{label}</button>)}</div>
    {notice && <div role="status" className="mb-5 rounded-lg border border-primary/30 bg-primary/5 px-4 py-3 text-sm text-foreground">{notice}</div>}
    {loading ? <div className="flex min-h-48 items-center justify-center text-muted-foreground"><Loader2 className="mr-2 h-5 w-5 animate-spin" />Loading owner data…</div> : <>
      {tab === "overview" && <div className="space-y-7"><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{cards.map(([label, value]) => <div key={String(label)} className="rounded-xl border border-border bg-card p-4"><p className="text-xs text-muted-foreground">{label}</p><p className="mt-2 text-2xl font-semibold text-foreground">{value}</p></div>)}</div><div className="rounded-xl border border-border bg-card p-5"><h2 className="font-semibold">Language usage</h2>{overview?.language_usage.length ? <ul className="mt-3 space-y-2 text-sm">{overview.language_usage.map(item => <li key={item.language} className="flex justify-between border-b border-border pb-2"><span>{item.language}</span><span>{item.count}</span></li>)}</ul> : <p className="mt-2 text-sm text-muted-foreground">No recorded language switches yet.</p>}</div></div>}
      {tab === "content" && <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]"><form onSubmit={saveContent} className="rounded-xl border border-border bg-card p-5 space-y-4"><h2 className="font-semibold">Edit public copy</h2><p className="text-xs text-muted-foreground">Updates are persisted, publishable, and locale-specific.</p><label className="block text-sm">Language<select value={form.locale} onChange={e => setForm({ ...form, locale: e.target.value })} className="mt-1 w-full rounded-lg border border-border bg-background p-2"><option value="en">English</option><option value="hi">Hindi</option></select></label><label className="block text-sm">Content key<input list="content-keys" value={form.key} onChange={e => setForm({ ...form, key: e.target.value })} className="mt-1 w-full rounded-lg border border-border bg-background p-2" required /><datalist id="content-keys">{contentSuggestions.map(key => <option key={key} value={key} />)}</datalist></label><label className="block text-sm">Text<textarea value={form.value} onChange={e => setForm({ ...form, value: e.target.value })} className="mt-1 min-h-32 w-full rounded-lg border border-border bg-background p-2" required /></label><label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.is_published} onChange={e => setForm({ ...form, is_published: e.target.checked })} />Published</label><button className="btn-primary">Save public content</button></form><div className="rounded-xl border border-border bg-card p-5"><h2 className="font-semibold">Saved overrides</h2>{content.length ? <div className="mt-3 space-y-2">{content.map(entry => <button key={entry.id} onClick={() => { setForm({ locale: entry.locale, key: entry.key, value: entry.value, is_published: entry.is_published }) }} className="block w-full rounded-lg border border-border p-3 text-left hover:bg-muted"><div className="flex justify-between gap-3 text-sm font-medium"><span>{entry.locale} · {entry.key}</span><span className="text-xs text-muted-foreground">{entry.is_published ? "Published" : "Draft"}</span></div><p className="mt-1 truncate text-xs text-muted-foreground">{entry.value}</p></button>)}</div> : <p className="mt-3 text-sm text-muted-foreground">No overrides saved yet. Base translations remain in use.</p>}</div></div>}
      {tab === "media" && <div className="grid gap-6 lg:grid-cols-[.8fr_1.2fr]"><form onSubmit={upload} className="rounded-xl border border-border bg-card p-5 space-y-4"><h2 className="font-semibold">Upload image</h2><p className="text-xs text-muted-foreground">JPEG, PNG, WebP, or GIF up to 5 MB. Uploaded files are stored in the application database.</p><input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={(e: ChangeEvent<HTMLInputElement>) => setFile(e.target.files?.[0] || null)} required /><button className="btn-primary" disabled={!file}>Upload</button></form><div className="rounded-xl border border-border bg-card p-5"><h2 className="font-semibold">Uploaded media</h2>{media.length ? <div className="mt-3 space-y-2">{media.map(item => <div key={item.id} className="flex items-center justify-between gap-3 rounded-lg border border-border p-3 text-sm"><a href={`/api/media/${item.id}`} target="_blank" className="truncate text-primary hover:underline">{item.filename}</a><span className="text-xs text-muted-foreground">{Math.ceil(item.size_bytes / 1024)} KB</span><button onClick={() => removeMedia(item.id)} className="text-xs text-destructive">Delete</button></div>)}</div> : <p className="mt-3 text-sm text-muted-foreground">No uploaded images.</p>}</div></div>}
      {tab === "users" && <Table headings={["Name", "Email", "Role", "Status", "Joined"]} rows={users.map(user => [user.name || "—", user.email || "—", user.role, user.is_active ? "Active" : "Disabled", new Date(user.created_at).toLocaleDateString()])} />}
      {tab === "audit" && <Table headings={["When", "Event", "Actor", "Details"]} rows={audit.map(item => [new Date(item.logged_at).toLocaleString(), item.activity_type, item.user_id ? `User #${item.user_id}` : "Anonymous", item.details || "—"])} />}
    </>}
  </section>
}

function Table({ headings, rows }: { headings: string[]; rows: string[][] }) {
  return <div className="overflow-x-auto rounded-xl border border-border bg-card"><table className="w-full text-left text-sm"><thead className="border-b border-border text-xs text-muted-foreground"><tr>{headings.map(heading => <th key={heading} className="px-4 py-3 font-medium">{heading}</th>)}</tr></thead><tbody>{rows.length ? rows.map((row, index) => <tr key={index} className="border-b border-border last:border-0">{row.map((value, cell) => <td key={cell} className="max-w-xs truncate px-4 py-3">{value}</td>)}</tr>) : <tr><td colSpan={headings.length} className="px-4 py-8 text-center text-muted-foreground">No records yet.</td></tr>}</tbody></table></div>
}
