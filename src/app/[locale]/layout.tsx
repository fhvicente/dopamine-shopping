import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { TRPCReactProvider } from "~/trpc/react";
import { Navbar } from "~/components/layout/Navbar";
import { Footer } from "~/components/layout/Footer";
import { Ticker } from "~/components/layout/Ticker";
import { CartNotification } from "~/components/cart/CartNotification";
import { locales, type Locale } from "~/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <TRPCReactProvider>
        <Ticker />
        <Navbar />
        <CartNotification />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </TRPCReactProvider>
    </NextIntlClientProvider>
  );
}
