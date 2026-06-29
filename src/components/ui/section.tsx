import { type ReactNode } from "react";
import { cn } from "~/lib/utils";

export function Section({
  className,
  containerClassName,
  children,
  id,
}: {
  className?: string;
  containerClassName?: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className={cn("w-full py-16 md:py-24", className)}>
      <div className={cn("container mx-auto max-w-7xl px-4 md:px-6", containerClassName)}>
        {children}
      </div>
    </section>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn(
        "mb-10 flex flex-col gap-3",
        align === "center" && "items-center text-center",
      )}
    >
      {eyebrow && (
        <span className="font-mono text-xs uppercase tracking-widest text-brand-accent">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl font-bold text-balance md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="max-w-2xl text-base text-text-muted md:text-lg">{subtitle}</p>
      )}
    </div>
  );
}
