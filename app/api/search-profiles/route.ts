import { NextResponse } from "next/server";
import {
  addSearchProfile,
  getSearchProfiles,
} from "@/lib/search-profile-store";
import { OperationalStatus, PropertyType } from "@/lib/marketplace-types";

type CreateSearchProfileRequest = {
  name?: string;
  propertyTypes?: PropertyType[];
  maxPrice?: number;
  operationalStatus?: OperationalStatus;
  state?: string;
  city?: string;
};

export async function GET() {
  return NextResponse.json({ profiles: getSearchProfiles() });
}

export async function POST(request: Request) {
  const body = (await request.json()) as CreateSearchProfileRequest;

  if (!body.name || body.name.trim().length < 3) {
    return NextResponse.json(
      { error: "Profile name must be at least 3 characters." },
      { status: 400 }
    );
  }

  const created = addSearchProfile({
    name: body.name.trim(),
    propertyTypes: body.propertyTypes ?? [],
    maxPrice: body.maxPrice,
    operationalStatus: body.operationalStatus,
    state: body.state?.trim() ?? "",
    city: body.city?.trim() ?? "",
  });

  return NextResponse.json({ profile: created }, { status: 201 });
}
