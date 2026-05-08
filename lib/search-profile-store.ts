import { SearchProfile } from "@/lib/marketplace-types";

let searchProfiles: SearchProfile[] = [
  {
    id: "seed-profile-1",
    name: "Pharma Factories in Gujarat under 50 Cr",
    propertyTypes: ["Factory"],
    maxPrice: 500000000,
    operationalStatus: "Running",
    state: "Gujarat",
    city: "",
    createdAt: new Date().toISOString(),
  },
];

export function getSearchProfiles() {
  return searchProfiles;
}

export function addSearchProfile(
  profile: Omit<SearchProfile, "id" | "createdAt">
): SearchProfile {
  const newProfile: SearchProfile = {
    ...profile,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  searchProfiles = [newProfile, ...searchProfiles];
  return newProfile;
}
