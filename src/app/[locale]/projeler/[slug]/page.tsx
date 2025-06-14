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
  language?: string;
}

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/projects/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setProject(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Detay alınamadı:", err);
        setLoading(false);
      });
  }, [slug]);

  const lang = "tr"; // Burayı locale'ye göre dinamik yapabilirsin

  if (loading) return <p className="p-6">Yükleniyor...</p>;
  if (!project) return <p className="p-6">Proje bulunamadı.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-[#212121]">
        {project.title[lang]}
      </h1>

      {/* Görsel galeri */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
        {(project.imageSrcs ?? [project.imageSrc]).map((src, index) => (
          <div
            key={index}
            className="w-full aspect-video relative overflow-hidden rounded-lg shadow-md"
          >
            <Image
              src={src || "/placeholder.jpg"}
              alt={`${project.title[lang]} görsel ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className="rounded"
            />
          </div>
        ))}
      </div>

      {/* Açıklama */}
      <div className="mt-6 text-[#2e7d32] font-medium text-lg">
        {project.description[lang]}
      </div>

      {/* Buton (örneğin bir demo linki ya da detay linki olabilir) */}
      {project.buttonText?.[lang] && (
        <button className="mt-6 bg-[#2e7d32] text-white px-6 py-2 rounded hover:bg-green-800 transition">
          {project.buttonText[lang]}
        </button>
      )}
    </div>
  );
}
