"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [form, setForm] = useState({
    title_tr: "",
    title_en: "",
    title_de: "",
    description_tr: "",
    description_en: "",
    description_de: "",
    buttonText_tr: "Projeyi Gör",
    buttonText_en: "View Project",
    buttonText_de: "Projekt ansehen",
    slug: "",
    language: "multi",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);

  // input ve textarea ortak değişim handler'ı
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (file) {
      formData.append("file", file);
    }

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (result.success) {
        setMessage({
          type: "success",
          text: result.message || "Başarıyla yüklendi.",
        });
        setForm({
          title_tr: "",
          title_en: "",
          title_de: "",
          description_tr: "",
          description_en: "",
          description_de: "",
          buttonText_tr: "Projeyi Gör",
          buttonText_en: "View Project",
          buttonText_de: "Projekt ansehen",
          slug: "",
          language: "multi",
        });
        setFile(null);
      } else {
        setMessage({
          type: "error",
          text: result.message || "Bir hata oluştu.",
        });
      }
    } catch {
      setMessage({ type: "error", text: "Sunucu ile bağlantı kurulamadı." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow mt-10 border border-gray-200">
      <h1 className="text-3xl font-bold mb-8 text-center text-green-700">
        Proje Ekle
      </h1>

      <Link href="/admin/dashboard">
        <button className="mb-6 bg-green-600 text-white px-5 py-3 rounded hover:bg-green-700 transition">
          Panele Dön
        </button>
      </Link>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Slug */}
        <div>
          <label className="block font-semibold mb-2 text-gray-700">
            Slug (Linkte Görünen Kısım - Başlığın İlk Kelimesi, Benzersiz
            Olmalı)
          </label>
          <input
            name="slug"
            placeholder="slug"
            value={form.slug}
            onChange={handleChange}
            disabled={loading}
            className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        {/* Başlıklar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {["tr", "en", "de"].map((lang) => (
            <div key={`title-${lang}`}>
              <label className="block font-semibold mb-2 text-gray-700">
                Başlık ({lang.toUpperCase()})
              </label>
              <input
                name={`title_${lang}`}
                value={form[`title_${lang}` as keyof typeof form]}
                onChange={handleChange}
                disabled={loading}
                className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>
          ))}
        </div>

        {/* Açıklamalar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {["tr", "en", "de"].map((lang) => (
            <div key={`description-${lang}`}>
              <label className="block font-semibold mb-2 text-gray-700">
                Açıklama ({lang.toUpperCase()})
              </label>
              <textarea
                name={`description_${lang}`}
                value={form[`description_${lang}` as keyof typeof form]}
                onChange={handleChange}
                disabled={loading}
                rows={4}
                className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>
          ))}
        </div>

        {/* Buton Metinleri (readonly) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {["tr", "en", "de"].map((lang) => (
            <div key={`buttonText-${lang}`}>
              <label className="block font-semibold mb-2 text-gray-700">
                Buton Metni ({lang.toUpperCase()})
              </label>
              <input
                name={`buttonText_${lang}`}
                value={form[`buttonText_${lang}` as keyof typeof form]}
                readOnly
                disabled={loading}
                className="w-full border border-gray-300 rounded-md px-4 py-3 bg-gray-100 text-gray-600 cursor-not-allowed"
              />
            </div>
          ))}
        </div>

        {/* Resim */}
        <div>
          <label className="block font-semibold mb-2 text-gray-700">
            Resim
          </label>
          <label
            htmlFor="file-upload"
            className="cursor-pointer inline-block px-6 py-3 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
          >
            {file ? file.name : "Dosya seç"}
          </label>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            disabled={loading}
          />
        </div>

        {/* Mesaj */}
        {message && (
          <p
            className={`mb-6 text-center font-semibold ${
              message.type === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {message.text}
          </p>
        )}

        {/* Gönder butonu */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed font-semibold"
        >
          {loading ? "Yükleniyor..." : "Gönder"}
        </button>
      </form>
    </div>
  );
}
