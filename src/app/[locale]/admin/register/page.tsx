"use client";

import { useState } from "react";

export default function RegisterForm() {
  const [kullaniciAdi, setKullaniciAdi] = useState("");
  const [parola, setParola] = useState("");
  const [loading, setLoading] = useState(false);
  const [mesaj, setMesaj] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMesaj("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ kullaniciAdi, parola }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMesaj(data.message || "Bir hata oluştu.");
      } else {
        setMesaj("Kayıt başarılı!");
        setKullaniciAdi("");
        setParola("");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMesaj(`Sunucu hatası: ${err.message}`);
      } else {
        setMesaj("Sunucu hatası.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-xl border mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">Kayıt Ol</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="kullaniciAdi"
            className="block text-sm font-medium text-gray-700"
          >
            Kullanıcı Adı
          </label>
          <input
            type="text"
            id="kullaniciAdi"
            value={kullaniciAdi}
            onChange={(e) => setKullaniciAdi(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-[#2E7D32] focus:border-[#2E7D32]"
          />
        </div>

        <div>
          <label
            htmlFor="parola"
            className="block text-sm font-medium text-gray-700"
          >
            Parola
          </label>
          <input
            type="password"
            id="parola"
            value={parola}
            onChange={(e) => setParola(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-[#2E7D32] focus:border-[#2E7D32]"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-[#2E7D32] text-white rounded-md hover:bg-[#276C2B] transition"
        >
          {loading ? "Kayıt olunuyor..." : "Kayıt Ol"}
        </button>
      </form>

      {mesaj && (
        <p
          className={`mt-4 text-center ${
            mesaj.includes("başarılı") ? "text-green-600" : "text-red-600"
          }`}
        >
          {mesaj}
        </p>
      )}
    </div>
  );
}
