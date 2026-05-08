"use client";

import {
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  Cell,
  Legend,
} from "recharts";

type SellerListing = {
  id: string;
  title: string;
  landAreaSqft: number;
  builtUpAreaSqft: number;
};

const sellerListings: SellerListing[] = [
  {
    id: "s1",
    title: "Pharma Processing Factory - Vapi",
    landAreaSqft: 120000,
    builtUpAreaSqft: 72000,
  },
  {
    id: "s2",
    title: "Auto Components Plant - Sanand",
    landAreaSqft: 150000,
    builtUpAreaSqft: 90000,
  },
];

const verificationTasks = [
  { id: "t1", label: "Factory License uploaded", completed: true },
  { id: "t2", label: "Land Title Deed uploaded", completed: true },
  { id: "t3", label: "Pollution Board NOC uploaded", completed: false },
  { id: "t4", label: "Latest Electricity Bill uploaded", completed: false },
  { id: "t5", label: "Geo-tagged property photos uploaded", completed: false },
];

const progressPercent = Math.round(
  (verificationTasks.filter((task) => task.completed).length / verificationTasks.length) *
    100
);

const CHART_COLORS = ["#2563eb", "#cbd5e1"];
const numberFormatter = new Intl.NumberFormat("en-IN");

const formatNumber = (value: number) => numberFormatter.format(value);

export default function SellerDashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="mx-auto w-full max-w-7xl px-6 py-10 md:px-10">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            Seller Dashboard
          </h1>
          <p className="mt-2 text-slate-600">
            Track listing quality and improve buyer trust with verification
            completion.
          </p>
        </header>

        <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-slate-900">
              Verification Progress
            </h2>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
              {progressPercent}% Complete
            </span>
          </div>

          <div className="mt-4 h-3 w-full rounded-full bg-slate-200">
            <div
              className="h-3 rounded-full bg-blue-600 transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {verificationTasks.map((task) => (
              <li
                key={task.id}
                className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
              >
                <span
                  className={
                    task.completed
                      ? "font-medium text-emerald-700"
                      : "font-medium text-slate-600"
                  }
                >
                  {task.completed ? "Done - " : "Pending - "}
                </span>
                <span className="text-slate-700">{task.label}</span>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="mt-5 inline-flex h-10 items-center justify-center rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Upload Missing Documents
          </button>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          {sellerListings.map((listing) => {
            const chartData = [
              { name: "Built-up", value: listing.builtUpAreaSqft },
              {
                name: "Open Land",
                value: Math.max(listing.landAreaSqft - listing.builtUpAreaSqft, 0),
              },
            ];

            return (
              <article
                key={listing.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <h3 className="text-base font-semibold text-slate-900">{listing.title}</h3>
                <p className="mt-1 text-sm text-slate-600">
                  Total Land: {formatNumber(listing.landAreaSqft)} sqft
                </p>

                <div className="mt-4">
                  <p className="mb-2 text-sm font-semibold text-slate-900">
                    Area Breakdown
                  </p>
                  <div className="h-52 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={chartData}
                          dataKey="value"
                          nameKey="name"
                          innerRadius={48}
                          outerRadius={72}
                          paddingAngle={2}
                        >
                          {chartData.map((entry, index) => (
                            <Cell
                              key={`${entry.name}-${index}`}
                              fill={CHART_COLORS[index % CHART_COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => (typeof value === 'number' ? formatNumber(value) : value)} />
                        <Legend verticalAlign="bottom" height={30} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      </main>
    </div>
  );
}
