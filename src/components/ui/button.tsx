"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "~/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer aria-disabled:cursor-not-allowed aria-disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-brand-primary via-brand-primary-deep to-brand-primary text-white shadow-[0_4px_20px_-4px_rgba(124,58,237,0.5)] hover:brightness-110",
        secondary:
          "bg-brand-accent text-bg-dark font-bold hover:brightness-110",
        hot: "bg-gradient-to-r from-brand-hot to-orange-500 text-white font-bold hover:brightness-110",
        outline:
          "border border-brand-primary/60 bg-brand-primary/10 text-foreground hover:bg-brand-primary/20",
        ghost: "bg-white/5 text-foreground hover:bg-white/10",
        link: "text-brand-primary-soft underline-offset-4 hover:underline",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-6 text-base rounded-xl",
        xl: "h-14 px-8 text-lg rounded-2xl",
        icon: "h-10 w-10",
      },
      glow: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        glow: true,
        variant: "default",
        class: "shadow-[0_0_25px_rgba(124,58,237,0.5)]",
      },
      {
        glow: true,
        variant: "hot",
        class: "shadow-[0_0_25px_rgba(239,68,68,0.5)]",
      },
      {
        glow: true,
        variant: "secondary",
        class: "shadow-[0_0_25px_rgba(245,158,11,0.4)]",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
      glow: false,
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, glow, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, glow, className }))}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
