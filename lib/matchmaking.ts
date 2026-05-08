import { Listing, ListingMatch, SearchProfile } from "@/lib/marketplace-types";

export function calculateMatchScore(
  listing: Listing,
  profile: SearchProfile
): ListingMatch {
  let score = 0;
  const reasons: string[] = [];

  if (profile.propertyTypes.length > 0) {
    if (profile.propertyTypes.includes(listing.propertyType)) {
      score += 30;
      reasons.push("Property type aligned");
    }
  } else {
    score += 30;
  }

  if (typeof profile.maxPrice === "number") {
    if (listing.price <= profile.maxPrice) {
      score += 25;
      reasons.push("Within budget");
    }
  } else {
    score += 25;
  }

  if (profile.operationalStatus) {
    if (listing.operationalStatus === profile.operationalStatus) {
      score += 20;
      reasons.push("Operational status matched");
    }
  } else {
    score += 20;
  }

  if (profile.state && profile.state.trim() !== "") {
    if (listing.state.toLowerCase() === profile.state.toLowerCase()) {
      score += 15;
      reasons.push("State matched");
    }
  } else {
    score += 15;
  }

  if (profile.city && profile.city.trim() !== "") {
    if (listing.city.toLowerCase() === profile.city.toLowerCase()) {
      score += 10;
      reasons.push("City matched");
    }
  } else {
    score += 10;
  }

  return {
    listing,
    score: Math.min(100, score),
    isMatch: score >= 55,
    reasons,
  };
}

export function getProfileMatches(listings: Listing[], profile: SearchProfile) {
  return listings
    .map((listing) => calculateMatchScore(listing, profile))
    .sort((a, b) => b.score - a.score);
}
