import { setRequestLocale } from "next-intl/server";
import { Hero } from "~/components/home/Hero";
import { CouponBanner } from "~/components/home/CouponBanner";
import { FlashDeals } from "~/components/home/FlashDeals";
import { ValueProps } from "~/components/home/ValueProps";
import { CategoryGrid } from "~/components/home/CategoryGrid";
import { Catalog } from "~/components/home/Catalog";
import { FAQ } from "~/components/home/FAQ";
import { Newsletter } from "~/components/home/Newsletter";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <CouponBanner />
      <FlashDeals />
      <ValueProps />
      <CategoryGrid />
      <Catalog />
      <FAQ />
      <Newsletter />
    </>
  );
}
