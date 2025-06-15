// app/[locale]/projeler/page.tsx

import { Metadata } from "next";
import { Project } from "../../../../types/project";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getTranslations } from "next-intl/server";

type Props = {
  params: { locale: "tr" | "en" | "de" };
};

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const t = await getTranslations("seo.projects");

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("ogDescription"),
      url: `https://yesilaluminyum.com/${params.locale}/projeler`,
      siteName: "Yeşil Alüminyum",
      images: [
        {
          url: `https://yesilaluminyum.com/images/og-proje.jpg`,
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

const ProjelerPage = async ({ params: { locale } }: Props) => {
  async function getProjects(): Promise<Project[]> {
    const res = await fetch(`${process.env.SITE_URL}/api/projects`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error("API isteği başarısız oldu");
    }

    const data = await res.json();
    return data.projects;
  }

  const projects = await getProjects();

  if (!projects.length) {
    return <div className="text-center text-xl py-20">Proje bulunamadı</div>;
  }
  console.log(
    "PROJE RESMLERİ",
    projects.map((p) => p.imageSrc)
  );

  return (
    <div className="max-w-full mx-auto py-14 px-6 ">
      <h1 className="text-4xl font-bold text-center mb-12">Projelerimiz</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10  w-full">
        {projects.map((project) => (
          <div
            key={project._id}
            className="flex flex-col md:flex-row bg-white border-r border-r-gray-400 hover:shadow-xl transition-all duration-300 overflow-hidden min-h-[400px] w-full"
          >
            {/* Görsel Alanı */}
            <div className="w-full md:w-1/2 relative h-64 md:h-auto min-h-[400px]">
              <Image
                src={project.imageSrc}
                alt={project.title?.[locale] ?? "Proje görseli"}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* İçerik Alanı */}
            <div className="w-full md:w-1/2 p-8 flex flex-col justify-between min-h-[400px]">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  {project.title[locale] ?? "Başlık yok"}
                </h2>
                <p className="text-gray-600 text-base leading-relaxed mb-6 line-clamp-5">
                  {project.description[locale] ?? "Açıklama yok"}
                </p>
              </div>

              <Link href={`/${locale}/projeler/${project.slug}`} passHref>
                <button className="mt-auto w-full md:w-fit px-6 py-3 bg-[#2E7D32] text-white font-medium rounded-md hover:bg-[#276C2B] transition-colors duration-300">
                  {project.buttonText[locale] ?? "Detay"}
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjelerPage;
