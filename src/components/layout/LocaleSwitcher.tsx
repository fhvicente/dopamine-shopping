"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "~/i18n/routing";
import { locales, localeFlags, localeNames, type Locale } from "~/i18n/config";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { cn } from "~/lib/utils";

export function LocaleSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-border-subtle bg-card/60 px-2.5 py-1.5 text-xs font-medium transition-colors hover:bg-card focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Change language"
      >
        <Globe className="h-3.5 w-3.5 text-text-muted" />
        <span>{localeFlags[locale]}</span>
        <span className="hidden uppercase sm:inline">{locale}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuLabel>idioma</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {locales.map((l) => (
          <DropdownMenuItem
            key={l}
            onSelect={() => router.replace(pathname, { locale: l })}
            className={cn(
              l === locale && "bg-brand-primary/15 text-brand-primary-soft",
            )}
          >
            <span className="text-sm">{localeFlags[l]}</span>
            <span className="flex-1">{localeNames[l]}</span>
            <span className="font-mono text-[10px] uppercase text-text-muted">
              {l}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
