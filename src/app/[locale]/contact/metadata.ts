import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations("seo.contact");

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("ogDescription"),
      url: `https://yesilaluminyum.com/${params.locale}/iletisim`,
      siteName: "Yeşil Alüminyum",
      images: [
        {
          url: "https://yesilaluminyum.com/images/og-contact.jpg",
          width: 1200,
          height: 630,
          alt: t("ogImageAlt"),
        },
      ],
      locale:
        params.locale === "tr"
          ? "tr_TR"
          : params.locale === "en"
          ? "en_US"
          : "de_DE",
      type: "website",
    },
  };
}
