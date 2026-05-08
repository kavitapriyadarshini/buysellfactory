export type PropertyType = "Factory" | "College" | "Warehouse";
export type OperationalStatus = "Closed" | "Running";

export type Listing = {
  id: string;
  title: string;
  isVerified: boolean;
  propertyType: PropertyType;
  price: number;
  operationalStatus: OperationalStatus;
  state: string;
  city: string;
  powerLoadKva: number;
  landAreaAcres: number;
};

export type SearchProfile = {
  id: string;
  name: string;
  propertyTypes: PropertyType[];
  maxPrice?: number;
  operationalStatus?: OperationalStatus;
  state?: string;
  city?: string;
  createdAt: string;
};

export type ListingMatch = {
  listing: Listing;
  score: number;
  isMatch: boolean;
  reasons: string[];
};
