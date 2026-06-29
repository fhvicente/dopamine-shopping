import { useTranslations } from "next-intl";
import { Link } from "~/i18n/routing";

export function Footer() {
  const t = useTranslations("footer");
  const cat = useTranslations("categories");

  return (
    <footer className="mt-24 border-t border-border-subtle bg-bg-card/40">
      <div className="container mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="grid gap-12 md:grid-cols-5">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-display text-2xl font-bold">
              <span className="text-3xl">💊</span>
              <span className="gradient-text">dopamina</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-text-muted">
              {t("tagline")} {t("tagline2")}
            </p>
          </div>

          <FooterColumn title={t("shop")}>
            <FooterLink href="/catalogo?cat=games">{cat("games")}</FooterLink>
            <FooterLink href="/catalogo?cat=tech">{cat("tech")}</FooterLink>
            <FooterLink href="/catalogo?cat=beauty">{cat("beauty")}</FooterLink>
            <FooterLink href="/catalogo?cat=fashion">{cat("fashion")}</FooterLink>
            <FooterLink href="/catalogo?cat=home">{cat("home")}</FooterLink>
          </FooterColumn>

          <FooterColumn title={t("company")}>
            <FooterLink href="/sobre">{t("links.about")}</FooterLink>
            <FooterLink href="/sobre">{t("links.suggestion")}</FooterLink>
            <FooterLink href="/sobre">{t("links.support")}</FooterLink>
          </FooterColumn>

          <FooterColumn title={t("help")}>
            <FooterLink href="/sobre">{t("links.helpCenter")}</FooterLink>
            <FooterLink href="/rastrear">{t("links.track")}</FooterLink>
            <FooterLink href="/sobre">{t("links.returns")}</FooterLink>
          </FooterColumn>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border-subtle pt-6 text-xs text-text-muted md:flex-row md:items-center md:justify-between">
          <p>{t("legal")}</p>
          <p>{t("made")}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="mb-4 font-mono text-xs font-semibold uppercase tracking-widest text-brand-primary-soft">
        {title}
      </h4>
      <ul className="flex flex-col gap-2 text-sm text-text-muted">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="transition hover:text-text-primary">
        {children}
      </Link>
    </li>
  );
}
