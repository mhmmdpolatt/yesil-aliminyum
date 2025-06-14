"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

export default function TeamAddForm() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (!name || !position) {
      setMessage({ type: "error", text: "İsim ve pozisyon zorunludur." });
      setLoading(false);
      return;
    }
    if (!file) {
      setMessage({ type: "error", text: "Lütfen bir resim seçin." });
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("position", position);
    formData.append("file", file);

    try {
      const res = await fetch(`/api/team`, {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (result.success) {
        setMessage({ type: "success", text: "Ekip üyesi başarıyla eklendi!" });
        setName("");
        setPosition("");
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
    <div className="max-w-md mx-auto p-8 bg-white rounded shadow mt-12">
      <Link href="/admin/dashboard">
        <button className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Panele Dön
        </button>
      </Link>
      <h2 className="text-2xl font-bold mb-6 text-center">Ekip Üyesi Ekle</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="name" className="block mb-1 font-medium">
            İsim
          </label>
          <input
            id="name"
            type="text"
            placeholder="İsim girin"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <div>
          <label htmlFor="position" className="block mb-1 font-medium">
            Pozisyon
          </label>
          <input
            id="position"
            type="text"
            placeholder="Pozisyon girin"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Fotoğraf</label>
          <label
            htmlFor="file-upload"
            className="cursor-pointer inline-block w-full text-center px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
          >
            {file ? file.name : "Dosya seç"}
          </label>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            disabled={loading}
            required
          />
          {preview && (
            <div className="relative mt-4 mx-auto rounded max-h-48 w-full h-48 sm:h-60 sm:w-60">
              <Image
                src={preview}
                alt="Önizleme"
                fill
                style={{ objectFit: "contain", borderRadius: "0.5rem" }}
                unoptimized // local object URLs için gereklidir
              />
            </div>
          )}
        </div>

        {message && (
          <p
            className={`text-center font-semibold ${
              message.type === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {message.text}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Yükleniyor..." : "Ekle"}
        </button>
      </form>
    </div>
  );
}
