"use client";

import { useTranslations } from "next-intl";
import { Link } from "~/i18n/routing";
import {
  ShoppingCart,
  User,
  Flame,
  Menu,
  MapPin,
  Volume2,
  VolumeX,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useCartStore, cartItemCount } from "~/store/cartStore";
import { useSoundStore } from "~/store/soundStore";
import { LocaleSwitcher } from "./LocaleSwitcher";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { cn } from "~/lib/utils";

export function Navbar() {
  const t = useTranslations("nav");
  const items = useCartStore((s) => s.items);
  const count = cartItemCount(items);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b transition-all duration-300",
        scrolled
          ? "border-border-subtle bg-bg-dark/80 backdrop-blur-xl"
          : "border-transparent bg-transparent",
      )}
    >
      <nav className="container mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link
          href="/"
          className="font-display flex items-center gap-2 text-xl font-bold"
        >
          <span className="text-2xl drop-shadow-[0_0_8px_rgba(124,58,237,0.7)]">
            💊
          </span>
          <span className="gradient-text">dopamina</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          <NavLink href="/catalogo">{t("catalog")}</NavLink>
          <NavLink href="/ofertas">
            <Flame className="text-brand-hot h-3.5 w-3.5" />
            {t("deals")}
          </NavLink>
          <NavLink href="/rastrear">
            <MapPin className="text-brand-accent h-3.5 w-3.5" />
            {t("track")}
          </NavLink>
          <NavLink href="/sobre">{t("about")}</NavLink>
        </div>

        <div className="flex items-center gap-2">
          <MuteToggle />
          <LocaleSwitcher />
          <Link
            href="/conta"
            className="text-text-muted hover:text-foreground hidden items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium md:flex"
          >
            <User className="h-4 w-4" />
            <span className="hidden lg:inline">{t("account")}</span>
          </Link>
          <Link
            href="/carrinho"
            className="border-brand-primary/40 bg-brand-primary/10 hover:bg-brand-primary/20 relative flex items-center gap-2 rounded-xl border px-3 py-2 font-medium transition"
          >
            <motion.span
              key={count}
              initial={count > 0 ? { scale: 1 } : false}
              animate={count > 0 ? { scale: [1, 1.4, 0.9, 1] } : { scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <ShoppingCart className="text-brand-primary-soft h-4 w-4" />
            </motion.span>
            <span className="hidden font-mono text-sm sm:inline">{count}</span>
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="bg-brand-hot absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full px-1 font-mono text-[10px] font-bold text-white shadow-[0_0_12px_rgba(239,68,68,0.6)] sm:hidden"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              aria-label="Menu"
              className="border-border-subtle bg-card/60 hover:bg-card flex cursor-pointer items-center justify-center rounded-lg border p-2 transition md:hidden"
            >
              <Menu className="h-4 w-4" />
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col gap-4">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <span className="text-2xl">💊</span>
                  <span className="gradient-text">dopamina</span>
                </SheetTitle>
              </SheetHeader>
              <div className="mt-4 flex flex-col gap-1">
                <MobileLink
                  href="/catalogo"
                  onClick={() => setMobileOpen(false)}
                >
                  {t("catalog")}
                </MobileLink>
                <MobileLink
                  href="/ofertas"
                  onClick={() => setMobileOpen(false)}
                >
                  🔥 {t("deals")}
                </MobileLink>
                <MobileLink
                  href="/rastrear"
                  onClick={() => setMobileOpen(false)}
                >
                  📍 {t("track")}
                </MobileLink>
                <MobileLink href="/sobre" onClick={() => setMobileOpen(false)}>
                  {t("about")}
                </MobileLink>
                <MobileLink href="/conta" onClick={() => setMobileOpen(false)}>
                  👤 {t("account")}
                </MobileLink>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}

function MuteToggle() {
  const muted = useSoundStore((s) => s.muted);
  const toggle = useSoundStore((s) => s.toggle);
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={muted ? "Ativar som" : "Silenciar"}
      className="border-border-subtle bg-card/60 text-text-muted hover:bg-card hover:text-foreground flex cursor-pointer items-center justify-center rounded-lg border p-2 transition"
    >
      {muted ? (
        <VolumeX className="h-4 w-4" />
      ) : (
        <Volume2 className="h-4 w-4" />
      )}
    </button>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-text-muted hover:text-foreground flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-white/5"
    >
      {children}
    </Link>
  );
}

function MobileLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="rounded-lg px-3 py-3 text-base font-medium transition hover:bg-white/5"
    >
      {children}
    </Link>
  );
}
