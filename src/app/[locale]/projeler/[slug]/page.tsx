"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

interface ProjectData {
  _id: string;
  title: { tr: string; en: string; de: string };
  description: { tr: string; en: string; de: string };
  buttonText?: { tr: string; en: string; de: string };
  slug: string;
  imageSrcs?: string[];
  imageSrc?: string;
}

export default function ProjectDetailPage() {
  const { slug, locale } = useParams() as {
    slug?: string;
    locale?: "tr" | "en" | "de";
  };
  const lang = locale || "tr"; // locale yoksa tr kullan

  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    setLoading(true);
    fetch(`/api/projects/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Proje yüklenirken hata oluştu");
        return res.json();
      })
      .then((data) => {
        setProject(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Detay alınamadı:", err);
        setProject(null);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <p className="p-6 text-center">Yükleniyor...</p>;
  if (!project) return <p className="p-6 text-center">Proje bulunamadı.</p>;

  // Görsel kaynağı yoksa placeholder kullan
  const images =
    project.imageSrcs && project.imageSrcs.length > 0
      ? project.imageSrcs
      : [project.imageSrc || "/placeholder.jpg"];

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-[#212121]">
        {project.title[lang]}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {images.map((src, idx) => (
          <div
            key={idx}
            className="relative w-full aspect-video rounded-lg overflow-hidden shadow-md"
          >
            <Image
              src={src}
              alt={`${project.title[lang]} görsel ${idx + 1}`}
              fill
              style={{ objectFit: "cover" }}
              className="rounded"
              sizes="(max-width: 640px) 100vw, 50vw"
              priority={idx === 0} // İlk görsel öncelikli yüklenir
            />
          </div>
        ))}
      </div>

      <p className="text-[#2e7d32] font-medium text-lg whitespace-pre-line">
        {project.description[lang]}
      </p>

      {project.buttonText?.[lang] && (
        <button className="mt-6 bg-[#2e7d32] text-white px-6 py-2 rounded hover:bg-green-800 transition">
          {project.buttonText[lang]}
        </button>
      )}
    </div>
  );
}
