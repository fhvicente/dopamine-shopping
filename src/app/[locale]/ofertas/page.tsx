import { setRequestLocale } from "next-intl/server";
import { DealsView } from "~/components/deals/DealsView";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <DealsView />;
}
