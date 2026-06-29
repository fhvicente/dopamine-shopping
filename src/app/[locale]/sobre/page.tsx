import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "~/i18n/routing";
import { Button } from "~/components/ui/button";
import { Rocket } from "lucide-react";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  return (
    <section className="container mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-24">
      <span className="font-mono text-xs uppercase tracking-widest text-brand-accent">
        ✦ {t("subtitle")}
      </span>
      <h1 className="mt-3 font-display text-5xl font-extrabold md:text-7xl">
        {t("title")}
      </h1>
      <p className="mt-6 font-display text-2xl font-medium text-text-muted md:text-3xl">
        {t("intro")}
      </p>
      <div className="mt-10 flex flex-col gap-5 text-base text-text-muted md:text-lg">
        <p>{t("p1")}</p>
        <p>{t("p2")}</p>
        <p>{t("p3")}</p>
      </div>
      <div className="mt-10">
        <Link href="/catalogo">
          <Button variant="default" size="lg" glow>
            <Rocket className="h-4 w-4" />
            {t("cta")} 🚀
          </Button>
        </Link>
      </div>
    </section>
  );
}
