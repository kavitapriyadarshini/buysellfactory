import { NextResponse } from "next/server";
import { listings } from "@/lib/listings-data";
import { getProfileMatches } from "@/lib/matchmaking";
import { getSearchProfiles } from "@/lib/search-profile-store";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const profileId = url.searchParams.get("profileId");

  const profiles = getSearchProfiles();
  const activeProfile = profileId
    ? profiles.find((profile) => profile.id === profileId)
    : profiles[0];

  if (!activeProfile) {
    return NextResponse.json(
      { error: "No search profile available.", matches: [] },
      { status: 404 }
    );
  }

  const matches = getProfileMatches(listings, activeProfile);

  return NextResponse.json({
    activeProfile,
    matches,
  });
}
