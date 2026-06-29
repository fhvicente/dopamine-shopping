import { setRequestLocale } from "next-intl/server";
import { Link } from "~/i18n/routing";
import { Button } from "~/components/ui/button";

export default async function AccountPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <section className="container mx-auto max-w-2xl px-4 py-20 text-center md:px-6">
      <div className="mb-4 text-6xl">👤</div>
      <h1 className="font-display text-4xl font-extrabold">a minha conta</h1>
      <p className="mt-3 text-text-muted">
        Não há nada para gerir. O teu histórico de compras imaginárias está seguro... na tua imaginação.
      </p>
      <div className="mt-8">
        <Link href="/rastrear">
          <Button variant="default" size="lg" glow>
            ver encomendas
          </Button>
        </Link>
      </div>
    </section>
  );
}
