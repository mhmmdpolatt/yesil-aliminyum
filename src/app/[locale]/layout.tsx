import { NextIntlClientProvider, hasLocale } from "next-intl";
import type { Metadata } from "next";

import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer/Footer";

export const metadata: Metadata = {
  title: "Yeşil Alüminyum | Dış Cephe ve Alüminyum Sistemleri",
  description:
    "Yeşil Alüminyum olarak dış cephe, kapı ve alüminyum doğrama çözümlerinde profesyonel hizmet sunuyoruz. Projelerimizi inceleyin.",
  keywords: [
    "Yeşil Alüminyum",
    "Dış Cephe Kaplama",
    "Alüminyum Doğrama",
    "Alüminyum Kapı",
    "Cephe Sistemleri",
    "Yapı ve İnşaat",
    "Cam Balkon",
    "PVC Doğrama",
    "Alüminyum Montaj",
  ],
  authors: [{ name: "Yeşil Alüminyum", url: "https://yesilaluminyum.com" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Yeşil Alüminyum | Projelerimiz",
    description:
      "Modern cephe sistemleri, alüminyum doğrama ve kapı çözümleriyle Yeşil Alüminyum’un tamamladığı projelere göz atın.",
    url: "https://yesilaluminyum.com/projeler",
    siteName: "Yeşil Alüminyum",
    images: [
      {
        url: "https://yesilaluminyum.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Yeşil Alüminyum Proje Görseli",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>
          <Navbar />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
