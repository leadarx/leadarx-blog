export function SkeletonCard() {
  return (
    <div className="bg-brand-card border border-brand-border rounded-xl overflow-hidden animate-pulse">
      <div className="aspect-video bg-brand-border" />
      <div className="p-5 space-y-3">
        <div className="h-3 w-20 bg-brand-border rounded" />
        <div className="h-5 w-full bg-brand-border rounded" />
        <div className="h-5 w-3/4 bg-brand-border rounded" />
        <div className="h-4 w-full bg-brand-border rounded" />
        <div className="h-4 w-5/6 bg-brand-border rounded" />
        <div className="flex gap-2 pt-2 border-t border-brand-border">
          <div className="h-8 w-8 bg-brand-border rounded-full" />
          <div className="flex-1 space-y-1">
            <div className="h-3 w-24 bg-brand-border rounded" />
            <div className="h-3 w-16 bg-brand-border rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function SkeletonPost() {
  return (
    <div className="animate-pulse space-y-6 max-w-3xl mx-auto">
      <div className="aspect-video bg-brand-card rounded-xl" />
      <div className="space-y-4">
        <div className="h-4 w-24 bg-brand-card rounded" />
        <div className="h-10 w-full bg-brand-card rounded" />
        <div className="h-10 w-3/4 bg-brand-card rounded" />
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-4 bg-brand-card rounded" style={{ width: `${70 + Math.random() * 30}%` }} />
        ))}
      </div>
    </div>
  );
}
