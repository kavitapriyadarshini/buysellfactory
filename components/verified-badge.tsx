import { BadgeCheck } from "lucide-react";

type VerifiedBadgeProps = {
  isVerified: boolean;
};

export function VerifiedBadge({ isVerified }: VerifiedBadgeProps) {
  if (!isVerified) return null;

  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-300 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
      <BadgeCheck className="h-3.5 w-3.5" />
      Verified
    </span>
  );
}
