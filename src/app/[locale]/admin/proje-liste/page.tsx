"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

type Project = {
  _id: string;
  title: { [key: string]: string };
  description: { [key: string]: string };
  imageSrc?: string;
  slug: string;
};

type Props = {
  locale: "tr" | "en" | "de";
};

const getImageSrc = (src?: string) => {
  if (!src || typeof src !== "string") return "/images/default-project.jpg";
  return src.startsWith("/") ? src : `/uploads/${src}`;
};

export default function ProjelerTable({ locale }: Props) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:3000/api/projects", {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Projeler yüklenemedi.");
      const data = await res.json();
      console.log("Projeler:", data);

      setProjects(data.projects || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const deleteProject = async (_id: string) => {
    const confirmed = confirm("Bu projeyi silmek istediğinize emin misiniz?");
    if (!confirmed) return;

    try {
      const res = await fetch("http://localhost:3000/api/projects", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id }),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.message || "Silinemedi.");

      setProjects((prev) => prev.filter((p) => p._id !== _id));
    } catch (err: any) {
      alert(`Hata: ${err.message}`);
    }
  };

  if (loading) return <div className="text-center py-10">Yükleniyor...</div>;
  if (error)
    return <div className="text-center text-red-600 py-10">{error}</div>;
  if (projects.length === 0)
    return <div className="text-center py-10">Henüz proje eklenmemiş.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Projeler</h1>
      <Link href="/admin/dashboard">
        <button className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Panele Dön
        </button>
      </Link>
      <div className="overflow-x-auto rounded shadow border border-gray-200">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3 border-b">Görsel</th>
              <th className="p-3 border-b">Başlık</th>
              <th className="p-3 border-b">Açıklama</th>
              <th className="p-3 border-b text-center">İşlem</th>
            </tr>
          </thead>

          <tbody>
            {projects.map((project) => (
              <tr key={project._id} className="hover:bg-gray-50 transition">
                <td className="p-3 border-b">
                  <Image
                    src={getImageSrc(project.imageSrc)}
                    alt={project.title.tr ?? "Görsel"}
                    width={64}
                    height={64}
                    className="object-cover rounded w-16 h-16"
                  />
                </td>

                <td className="p-3 border-b font-semibold text-gray-800">
                  {project.title.tr ?? "-"}
                </td>

                <td className="p-3 border-b text-center">
                  <button
                    onClick={() => deleteProject(project._id)}
                    className="px-4 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition"
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
