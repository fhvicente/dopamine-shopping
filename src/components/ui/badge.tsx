import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "~/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-brand-primary/15 text-brand-primary-soft border-brand-primary/30 shadow-[0_0_15px_rgba(124,58,237,0.3)]",
        accent:
          "bg-brand-accent/15 text-brand-accent border-brand-accent/30 shadow-[0_0_15px_rgba(245,158,11,0.3)]",
        hot:
          "bg-brand-hot/15 text-brand-hot border-brand-hot/30 shadow-[0_0_15px_rgba(239,68,68,0.4)]",
        ghost: "bg-white/5 text-text-muted border-border-subtle",
        success:
          "bg-emerald-500/15 text-emerald-300 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.3)]",
        outline: "border-border text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
