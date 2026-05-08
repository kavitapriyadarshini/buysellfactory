"use client";

import { useEffect, useMemo, useState } from "react";
import { DocumentVault } from "@/components/document-vault";
import { VerifiedBadge } from "@/components/verified-badge";
import { listings } from "@/lib/listings-data";
import { PropertyType, OperationalStatus } from "@/lib/marketplace-types";
import { Factory, Zap, Ruler } from "lucide-react";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export default function BrowseListingsPage() {
  const [propertyTypes, setPropertyTypes] = useState<PropertyType[]>([]);
  const [operationalStatus, setOperationalStatus] = useState<OperationalStatus | "">(
    ""
  );
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [stateQuery, setStateQuery] = useState("");
  const [cityQuery, setCityQuery] = useState("");
  const [matchScores, setMatchScores] = useState<Record<string, number>>({});

  useEffect(() => {
    const loadScores = async () => {
      try {
        const response = await fetch("/api/listings/matches", {
          method: "GET",
          cache: "no-store",
        });

        if (!response.ok) return;

        const data = (await response.json()) as {
          matches: { listing: { id: string }; score: number }[];
        };

        const nextScores = data.matches.reduce<Record<string, number>>(
          (acc, match) => {
            acc[match.listing.id] = match.score;
            return acc;
          },
          {}
        );

        setMatchScores(nextScores);
      } catch {
        setMatchScores({});
      }
    };

    loadScores();
  }, []);

  const filteredListings = useMemo(() => {
    const min = Number(minPrice);
    const max = Number(maxPrice);

    return listings.filter((listing) => {
      const matchesPropertyType =
        propertyTypes.length === 0 || propertyTypes.includes(listing.propertyType);
      const matchesStatus =
        operationalStatus === "" || listing.operationalStatus === operationalStatus;
      const matchesMinPrice = Number.isNaN(min) ? true : listing.price >= min;
      const matchesMaxPrice = Number.isNaN(max) ? true : listing.price <= max;
      const matchesState =
        stateQuery.trim() === "" ||
        listing.state.toLowerCase().includes(stateQuery.toLowerCase().trim());
      const matchesCity =
        cityQuery.trim() === "" ||
        listing.city.toLowerCase().includes(cityQuery.toLowerCase().trim());

      return (
        matchesPropertyType &&
        matchesStatus &&
        matchesMinPrice &&
        matchesMaxPrice &&
        matchesState &&
        matchesCity
      );
    });
  }, [propertyTypes, operationalStatus, minPrice, maxPrice, stateQuery, cityQuery]);

  const togglePropertyType = (type: PropertyType) => {
    setPropertyTypes((current) =>
      current.includes(type)
        ? current.filter((item) => item !== type)
        : [...current, type]
    );
  };

  const clearFilters = () => {
    setPropertyTypes([]);
    setOperationalStatus("");
    setMinPrice("");
    setMaxPrice("");
    setStateQuery("");
    setCityQuery("");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="mx-auto w-full max-w-7xl px-6 py-10 md:px-10">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            Browse Listings
          </h1>
          <p className="mt-2 text-slate-600">
            Filter industrial properties by type, pricing, operational status, and
            location.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">Filters</h2>
              <button
                type="button"
                onClick={clearFilters}
                className="text-sm font-medium text-blue-600 transition hover:text-blue-700"
              >
                Clear all
              </button>
            </div>

            <div className="space-y-6">
              <section>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-700">
                  Property Type
                </h3>
                <div className="space-y-2">
                  {(["Factory", "College", "Warehouse"] as PropertyType[]).map((type) => (
                    <label key={type} className="flex items-center gap-2 text-sm text-slate-700">
                      <input
                        type="checkbox"
                        checked={propertyTypes.includes(type)}
                        onChange={() => togglePropertyType(type)}
                        className="h-4 w-4 rounded border-slate-300 text-blue-700 focus:ring-blue-600"
                      />
                      {type}
                    </label>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-700">
                  Price Range
                </h3>
                <div className="grid gap-2">
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder="Min price (INR)"
                    className="h-10 rounded-lg border border-slate-300 px-3 text-sm outline-none ring-blue-500 focus:ring-2"
                  />
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder="Max price (INR)"
                    className="h-10 rounded-lg border border-slate-300 px-3 text-sm outline-none ring-blue-500 focus:ring-2"
                  />
                </div>
              </section>

              <section>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-700">
                  Operational Status
                </h3>
                <div className="space-y-2">
                  {(["Running", "Closed"] as OperationalStatus[]).map((status) => (
                    <label
                      key={status}
                      className="flex items-center gap-2 text-sm text-slate-700"
                    >
                      <input
                        type="radio"
                        name="operational-status"
                        checked={operationalStatus === status}
                        onChange={() => setOperationalStatus(status)}
                        className="h-4 w-4 border-slate-300 text-blue-700 focus:ring-blue-600"
                      />
                      {status}
                    </label>
                  ))}
                  <button
                    type="button"
                    onClick={() => setOperationalStatus("")}
                    className="text-sm font-medium text-slate-500 transition hover:text-slate-700"
                  >
                    Reset status
                  </button>
                </div>
              </section>

              <section>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-700">
                  State / City
                </h3>
                <div className="grid gap-2">
                  <input
                    type="text"
                    value={stateQuery}
                    onChange={(e) => setStateQuery(e.target.value)}
                    placeholder="Filter by state"
                    className="h-10 rounded-lg border border-slate-300 px-3 text-sm outline-none ring-blue-500 focus:ring-2"
                  />
                  <input
                    type="text"
                    value={cityQuery}
                    onChange={(e) => setCityQuery(e.target.value)}
                    placeholder="Filter by city"
                    className="h-10 rounded-lg border border-slate-300 px-3 text-sm outline-none ring-blue-500 focus:ring-2"
                  />
                </div>
              </section>
            </div>
          </aside>

          <section className="space-y-4">
            <p className="text-sm font-medium text-slate-600">
              Showing {filteredListings.length} of {listings.length} listings
            </p>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {filteredListings.map((listing) => (
                <article
                  key={listing.id}
                  className="rounded-2xl border border-slate-300 bg-gradient-to-b from-white to-slate-50 p-5 shadow-sm"
                >
                  <div className="mb-3 flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
                        <Factory className="h-3.5 w-3.5" />
                        {listing.propertyType}
                      </span>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          listing.operationalStatus === "Running"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-slate-200 text-slate-700"
                        }`}
                      >
                        {listing.operationalStatus}
                      </span>
                    </div>
                    {typeof matchScores[listing.id] === "number" ? (
                      <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-800">
                        Match Score: {matchScores[listing.id]}%
                      </span>
                    ) : null}
                  </div>

                  <h3 className="text-lg font-semibold leading-snug text-slate-900">
                    {listing.title}
                  </h3>
                  <div className="mt-2">
                    <VerifiedBadge isVerified={listing.isVerified} />
                  </div>
                  <p className="mt-1 text-sm text-slate-600">
                    {listing.city}, {listing.state}
                  </p>

                  <p className="mt-3 text-base font-semibold text-blue-700">
                    {formatCurrency(listing.price)}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1 rounded-md border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-800">
                      <Zap className="h-3.5 w-3.5" />
                      Power Load: {listing.powerLoadKva} kVA
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-md border border-slate-300 bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                      <Ruler className="h-3.5 w-3.5" />
                      Land Area: {listing.landAreaAcres} Acres
                    </span>
                  </div>

                  <DocumentVault listingTitle={listing.title} />
                </article>
              ))}
            </div>

            {filteredListings.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">
                No listings match your current filters. Try broadening your criteria.
              </div>
            ) : null}
          </section>
        </div>
      </main>
    </div>
  );
}
