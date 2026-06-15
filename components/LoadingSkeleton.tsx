'use client';

export default function LoadingSkeleton() {
  return (
    <div className="flex flex-col gap-8 px-4 pb-12 pt-6">
      {/* Featured row */}
      <div>
        <div className="skeleton h-7 w-40 rounded-lg mb-4" />
        <div className="flex gap-3 overflow-hidden">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex-shrink-0 w-48 rounded-2xl overflow-hidden">
              <div className="skeleton aspect-[4/3] w-full" />
              <div className="p-3 bg-night-card flex flex-col gap-2">
                <div className="skeleton h-4 w-3/4 rounded" />
                <div className="skeleton h-3 w-1/2 rounded" />
                <div className="skeleton h-7 w-24 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grid sections */}
      {Array.from({ length: 2 }).map((_, s) => (
        <div key={s}>
          <div className="skeleton h-7 w-32 rounded-lg mb-4" />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden">
                <div className="skeleton aspect-[4/3] w-full" />
                <div className="p-3 bg-night-card flex flex-col gap-2">
                  <div className="skeleton h-4 w-3/4 rounded" />
                  <div className="skeleton h-7 w-20 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
