import { Star } from "lucide-react";
import { cn, formatNumber } from "~/lib/utils";

export function StarRating({
  rating,
  reviewCount,
  size = "sm",
  showCount = true,
  locale = "pt-PT",
}: {
  rating: number;
  reviewCount?: number;
  size?: "sm" | "md" | "lg";
  showCount?: boolean;
  locale?: string;
}) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);

  const px = size === "sm" ? "h-3.5 w-3.5" : size === "md" ? "h-4 w-4" : "h-5 w-5";
  const text =
    size === "sm" ? "text-xs" : size === "md" ? "text-sm" : "text-base";

  return (
    <div className={cn("flex items-center gap-1.5", text)}>
      <div className="flex items-center text-brand-accent">
        {Array.from({ length: full }).map((_, i) => (
          <Star key={`f-${i}`} className={cn(px, "fill-current")} />
        ))}
        {half && (
          <div className="relative">
            <Star className={cn(px, "text-brand-accent/30 fill-current")} />
            <Star
              className={cn(px, "absolute inset-0 fill-current")}
              style={{ clipPath: "inset(0 50% 0 0)" }}
            />
          </div>
        )}
        {Array.from({ length: empty }).map((_, i) => (
          <Star key={`e-${i}`} className={cn(px, "text-brand-accent/30 fill-current")} />
        ))}
      </div>
      {showCount && reviewCount !== undefined && (
        <span className="font-mono text-text-muted">
          ({formatNumber(reviewCount, locale)})
        </span>
      )}
    </div>
  );
}
