import { VerifiedBadge } from "@/components/verified-badge";

export default function Home() {
  const featuredListings = [
    {
      title: "North Cluster Precision Manufacturing Park",
      category: "Factory",
      isVerified: true,
      location: "MIDC, Pune Industrial Zone",
      price: "INR 22.5 Cr",
      powerLoad: "2200 kVA",
      landArea: "4.8 Acres",
      status: "Operational",
    },
    {
      title: "Advanced Tooling & Fabrication Campus",
      category: "Factory",
      isVerified: false,
      location: "Sanand GIDC, Ahmedabad",
      price: "INR 18.2 Cr",
      powerLoad: "1650 kVA",
      landArea: "3.6 Acres",
      status: "Auction",
    },
    {
      title: "Industrial Skills Institute Complex",
      category: "Institute",
      isVerified: true,
      location: "Oragadam SIPCOT, Chennai",
      price: "INR 12.9 Cr",
      powerLoad: "950 kVA",
      landArea: "2.4 Acres",
      status: "Operational",
    },
    {
      title: "Heavy Engineering Training & R&D Block",
      category: "Institute",
      isVerified: false,
      location: "Peenya, Bengaluru Industrial Zone",
      price: "INR 15.7 Cr",
      powerLoad: "1200 kVA",
      landArea: "3.1 Acres",
      status: "Closed",
    },
    {
      title: "Automotive Components Production Unit",
      category: "Factory",
      isVerified: true,
      location: "Chakan, Pune Industrial Zone",
      price: "INR 20.3 Cr",
      powerLoad: "2100 kVA",
      landArea: "4.2 Acres",
      status: "Operational",
    },
    {
      title: "Textile Machinery Education & Testing Hub",
      category: "Institute",
      isVerified: true,
      location: "Pithampur, Indore",
      price: "INR 10.4 Cr",
      powerLoad: "780 kVA",
      landArea: "1.9 Acres",
      status: "Auction",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-blue-50/30 to-slate-100 text-slate-900">
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-6 py-10 md:px-10 lg:px-14 lg:py-14">
        <section className="rounded-3xl border border-blue-200/70 bg-white/90 p-8 shadow-lg shadow-blue-100/50 backdrop-blur md:p-12">
          <div className="max-w-3xl space-y-6">
            <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-800">
              Industrial Real Estate Marketplace
            </span>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-slate-900 md:text-5xl">
              Discover verified industrial zones for factories and institutes.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
              Accelerate site selection with high-intent listings, infrastructure
              details, and transparent pricing curated for B2B buyers, operators,
              and investment teams.
            </p>
          </div>

          <form className="mt-8 flex w-full flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 md:flex-row md:items-center">
            <input
              type="text"
              defaultValue="Industrial Zones"
              aria-label="Search industrial zones"
              className="h-12 flex-1 rounded-xl border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 outline-none ring-blue-500 transition focus:ring-2"
            />
            <button
              type="submit"
              className="h-12 rounded-xl bg-blue-600 px-6 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Search Listings
            </button>
          </form>
        </section>

        <section className="space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
                Curated Opportunities
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
                Featured Listings
              </h2>
            </div>
            <a
              href="#"
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-700"
            >
              View All
            </a>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featuredListings.map((listing) => (
              <article
                key={listing.title}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-md"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
                    {listing.category}
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                    {listing.status}
                  </span>
                </div>

                <h3 className="text-lg font-semibold leading-snug text-slate-900">
                  {listing.title}
                </h3>
                <div className="mt-2">
                  <VerifiedBadge isVerified={listing.isVerified} />
                </div>
                <p className="mt-2 text-sm text-slate-600">{listing.location}</p>

                <p className="mt-4 text-base font-semibold text-blue-700">
                  {listing.price}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="rounded-md border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-800">
                    Power Load: {listing.powerLoad}
                  </span>
                  <span className="rounded-md border border-slate-300 bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                    Land Area: {listing.landArea}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
