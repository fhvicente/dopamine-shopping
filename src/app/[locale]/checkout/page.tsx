import { setRequestLocale } from "next-intl/server";
import { CheckoutFlow } from "~/components/checkout/CheckoutFlow";

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CheckoutFlow />;
}
