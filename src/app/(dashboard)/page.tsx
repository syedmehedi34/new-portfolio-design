// src/app/(dashboard)/page.tsx
export default function DashboardPage() {
  const stats = [
    { label: "Total Users", value: "2,431" },
    { label: "Revenue", value: "$12,540" },
    { label: "Active Sessions", value: "184" },
    { label: "Conversion Rate", value: "4.2%" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Dashboard</h2>
        <p className="text-sm text-muted mt-1">
          Welcome back, here&apos;s what&apos;s happening today.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border bg-surface p-5"
          >
            <p className="text-sm text-muted">{stat.label}</p>
            <p className="text-2xl font-semibold mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-surface p-6 min-h-[300px] flex items-center justify-center text-muted text-sm">
        Chart / Table content will go here
      </div>
    </div>
  );
}
