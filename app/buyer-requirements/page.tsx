"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import {
  OperationalStatus,
  PropertyType,
  SearchProfile,
  ListingMatch,
} from "@/lib/marketplace-types";
import { VerifiedBadge } from "@/components/verified-badge";

type ProfilesResponse = {
  profiles: SearchProfile[];
};

type MatchesResponse = {
  activeProfile: SearchProfile;
  matches: ListingMatch[];
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export default function BuyerRequirementsPage() {
  const [profiles, setProfiles] = useState<SearchProfile[]>([]);
  const [activeProfileId, setActiveProfileId] = useState("");
  const [matches, setMatches] = useState<ListingMatch[]>([]);
  const [loadingMatches, setLoadingMatches] = useState(false);

  const [profileName, setProfileName] = useState("");
  const [propertyTypes, setPropertyTypes] = useState<PropertyType[]>([]);
  const [maxPrice, setMaxPrice] = useState("");
  const [operationalStatus, setOperationalStatus] = useState<OperationalStatus | "">(
    ""
  );
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const activeProfile = useMemo(
    () => profiles.find((profile) => profile.id === activeProfileId),
    [profiles, activeProfileId]
  );

  const loadProfiles = useCallback(async () => {
    const response = await fetch("/api/search-profiles", {
      method: "GET",
      cache: "no-store",
    });
    if (!response.ok) return;

    const data = (await response.json()) as ProfilesResponse;
    setProfiles(data.profiles);
    if (!activeProfileId && data.profiles.length > 0) {
      setActiveProfileId(data.profiles[0].id);
    }
  }, [activeProfileId]);

  const loadMatches = useCallback(async (profileId: string) => {
    if (!profileId) return;
    setLoadingMatches(true);
    try {
      const response = await fetch(`/api/listings/matches?profileId=${profileId}`, {
        method: "GET",
        cache: "no-store",
      });
      if (!response.ok) {
        setMatches([]);
        return;
      }

      const data = (await response.json()) as MatchesResponse;
      setMatches(data.matches);
    } finally {
      setLoadingMatches(false);
    }
  }, []);

  useEffect(() => {
    queueMicrotask(() => {
      void loadProfiles();
    });
  }, [loadProfiles]);

  useEffect(() => {
    if (activeProfileId) {
      queueMicrotask(() => {
        void loadMatches(activeProfileId);
      });
    }
  }, [activeProfileId, loadMatches]);

  const togglePropertyType = (type: PropertyType) => {
    setPropertyTypes((current) =>
      current.includes(type)
        ? current.filter((item) => item !== type)
        : [...current, type]
    );
  };

  const handleCreateProfile = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (profileName.trim().length < 3) return;

    const response = await fetch("/api/search-profiles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: profileName.trim(),
        propertyTypes,
        maxPrice: maxPrice.trim() ? Number(maxPrice) : undefined,
        operationalStatus: operationalStatus || undefined,
        state: state.trim(),
        city: city.trim(),
      }),
    });

    if (!response.ok) return;

    const data = (await response.json()) as { profile: SearchProfile };
    const created = data.profile;
    setProfiles((current) => [created, ...current]);
    setActiveProfileId(created.id);

    setProfileName("");
    setPropertyTypes([]);
    setMaxPrice("");
    setOperationalStatus("");
    setState("");
    setCity("");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="mx-auto w-full max-w-7xl px-6 py-10 md:px-10">
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">Buyer Requirements</h1>
          <p className="text-slate-600">
            Save search profiles and auto-flag listings based on backend match
            scoring.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
          <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold">Create Search Profile</h2>
            <form className="mt-4 space-y-4" onSubmit={handleCreateProfile}>
              <input
                required
                type="text"
                value={profileName}
                onChange={(event) => setProfileName(event.target.value)}
                placeholder="e.g. Pharma Factories in Gujarat under 50 Cr"
                className="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none ring-blue-500 focus:ring-2"
              />

              <div>
                <p className="mb-2 text-sm font-semibold text-slate-700">Property Type</p>
                <div className="flex flex-wrap gap-2">
                  {(["Factory", "College", "Warehouse"] as PropertyType[]).map((type) => (
                    <label
                      key={type}
                      className={`cursor-pointer rounded-lg border px-3 py-2 text-sm transition ${
                        propertyTypes.includes(type)
                          ? "border-blue-700 bg-blue-50 text-blue-800"
                          : "border-slate-300 bg-white text-slate-700"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={propertyTypes.includes(type)}
                        onChange={() => togglePropertyType(type)}
                        className="sr-only"
                      />
                      {type}
                    </label>
                  ))}
                </div>
              </div>

              <input
                type="number"
                value={maxPrice}
                onChange={(event) => setMaxPrice(event.target.value)}
                placeholder="Max Price (INR)"
                className="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none ring-blue-500 focus:ring-2"
              />

              <select
                value={operationalStatus}
                onChange={(event) =>
                  setOperationalStatus(event.target.value as OperationalStatus | "")
                }
                className="h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm outline-none ring-blue-500 focus:ring-2"
              >
                <option value="">Any Operational Status</option>
                <option value="Running">Running</option>
                <option value="Closed">Closed</option>
              </select>

              <div className="grid gap-2 sm:grid-cols-2">
                <input
                  type="text"
                  value={state}
                  onChange={(event) => setState(event.target.value)}
                  placeholder="State"
                  className="h-10 rounded-lg border border-slate-300 px-3 text-sm outline-none ring-blue-500 focus:ring-2"
                />
                <input
                  type="text"
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                  placeholder="City"
                  className="h-10 rounded-lg border border-slate-300 px-3 text-sm outline-none ring-blue-500 focus:ring-2"
                />
              </div>

              <button
                type="submit"
                className="inline-flex h-10 w-full items-center justify-center rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Save Search Profile
              </button>
            </form>
          </aside>

          <section className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-sm font-semibold text-slate-700">Saved Profiles</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {profiles.map((profile) => (
                  <button
                    key={profile.id}
                    type="button"
                    onClick={() => setActiveProfileId(profile.id)}
                    className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${
                      profile.id === activeProfileId
                        ? "border-blue-600 bg-blue-50 text-blue-800"
                        : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"
                    }`}
                  >
                    {profile.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">
                Listing Matches {activeProfile ? `for "${activeProfile.name}"` : ""}
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Listings are ranked with backend match scoring and flagged when
                they meet relevance thresholds.
              </p>

              {loadingMatches ? (
                <p className="mt-4 text-sm text-slate-500">Loading matches...</p>
              ) : (
                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                  {matches.map((match) => (
                    <article
                      key={match.listing.id}
                      className="rounded-xl border border-slate-300 bg-gradient-to-b from-white to-slate-50 p-4"
                    >
                      <div className="mb-2 flex items-center justify-between gap-2">
                        <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-800">
                          {match.listing.propertyType}
                        </span>
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                            match.isMatch
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          Match Score: {match.score}%
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-slate-900">
                        {match.listing.title}
                      </h4>
                      <div className="mt-2">
                        <VerifiedBadge isVerified={match.listing.isVerified} />
                      </div>
                      <p className="mt-1 text-xs text-slate-600">
                        {match.listing.city}, {match.listing.state}
                      </p>
                      <p className="mt-2 text-sm font-semibold text-blue-700">
                        {formatCurrency(match.listing.price)}
                      </p>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
