export default function Loading() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 rounded-full border-2 border-forest border-t-gold animate-spin" />
        <p className="text-sand text-sm">Loading…</p>
      </div>
    </div>
  )
}