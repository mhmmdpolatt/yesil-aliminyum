"use client";

import React, { useState } from "react";

export default function ContactFormPage() {
  const [addresses, setAddresses] = useState([{ label: "", address: "" }]);
  const [emails, setEmails] = useState([""]);
  const [phones, setPhones] = useState([""]);
  const [mapEmbeds, setMapEmbeds] = useState([{ label: "", url: "" }]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/contact-info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          addresses,
          emails,
          phones,
          mapEmbeds,
        }),
      });

      if (res.ok) {
        setMessage("Bilgiler başarıyla oluşturuldu.");
        setAddresses([{ label: "", address: "" }]);
        setEmails([""]);
        setPhones([""]);
        setMapEmbeds([{ label: "", url: "" }]);
      } else {
        const data = await res.json();
        setMessage(data.message || "Gönderirken hata oluştu.");
      }
    } catch (err) {
      setMessage("Sunucu hatası.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl p-6">
      <h1 className="text-2xl font-semibold mb-4">İletişim Bilgisi Ekle</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        {/* Adresler */}
        {addresses.map((item, i) => (
          <div key={i} className="flex flex-col gap-2 border p-3 rounded">
            <input
              placeholder={`Adres Etiketi #${i + 1}`}
              value={item.label}
              onChange={(e) => {
                const newAddresses = [...addresses];
                newAddresses[i].label = e.target.value;
                setAddresses(newAddresses);
              }}
              className="p-2 border rounded"
              required
            />
            <input
              placeholder={`Adres #${i + 1}`}
              value={item.address}
              onChange={(e) => {
                const newAddresses = [...addresses];
                newAddresses[i].address = e.target.value;
                setAddresses(newAddresses);
              }}
              className="p-2 border rounded"
              required
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            setAddresses([...addresses, { label: "", address: "" }])
          }
          className="text-sm text-blue-600 underline self-start"
        >
          + Adres Ekle
        </button>

        {/* E-postalar */}
        {emails.map((email, i) => (
          <input
            key={i}
            type="email"
            placeholder={`E-posta #${i + 1}`}
            value={email}
            onChange={(e) => {
              const newEmails = [...emails];
              newEmails[i] = e.target.value;
              setEmails(newEmails);
            }}
            className="p-2 border rounded"
            required
          />
        ))}
        <button
          type="button"
          onClick={() => setEmails([...emails, ""])}
          className="text-sm text-blue-600 underline self-start"
        >
          + E-posta Ekle
        </button>

        {/* Telefonlar */}
        {phones.map((phone, i) => (
          <input
            key={i}
            placeholder={`Telefon #${i + 1}`}
            value={phone}
            onChange={(e) => {
              const newPhones = [...phones];
              newPhones[i] = e.target.value;
              setPhones(newPhones);
            }}
            className="p-2 border rounded"
            required
          />
        ))}
        <button
          type="button"
          onClick={() => setPhones([...phones, ""])}
          className="text-sm text-blue-600 underline self-start"
        >
          + Telefon Ekle
        </button>

        {/* Haritalar */}
        <div className="space-y-2">
          <label className="text-sm text-gray-600">
            Harita Bilgileri (Başlık ve Google Maps embed URL'si):
          </label>

          {mapEmbeds.map((map, i) => (
            <div key={i} className="flex flex-col gap-2 border p-3 rounded">
              <input
                placeholder={`Harita Etiketi #${i + 1} (ör. Türkiye Ofis)`}
                value={map.label}
                onChange={(e) => {
                  const newMaps = [...mapEmbeds];
                  newMaps[i].label = e.target.value;
                  setMapEmbeds(newMaps);
                }}
                className="p-2 border rounded"
                required
              />
              <input
                placeholder={`Embed URL #${i + 1}`}
                value={map.url}
                onChange={(e) => {
                  const newMaps = [...mapEmbeds];
                  newMaps[i].url = e.target.value;
                  setMapEmbeds(newMaps);
                }}
                className="p-2 border rounded"
                required
              />
            </div>
          ))}

          <button
            type="button"
            onClick={() => setMapEmbeds([...mapEmbeds, { label: "", url: "" }])}
            className="text-sm text-blue-600 underline self-start"
          >
            + Harita Ekle
          </button>

          <p className="text-xs text-gray-500 mt-1">
            🔹 Embed URL’si için Google Maps’te “Paylaş” → “Haritayı Yerleştir”
            seçip, çıkan iframe'deki `src` değerini yapıştırın.
          </p>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
        >
          Oluştur
        </button>
      </form>

      {message && (
        <p
          className={`mt-4 ${
            message.includes("başarı") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
