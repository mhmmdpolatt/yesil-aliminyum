"use client";

import React, { useEffect, useState } from "react";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaUser,
  FaPaperPlane,
} from "react-icons/fa";

type MapEmbed = {
  label: string;
  url: string;
  _id?: string;
};
type ContactInfo = {
  addresses: { label: string; address: string; _id?: string }[];
  phones: string[];
  emails: string[];
  mapEmbeds: MapEmbed[];
};

export default function ContactPage() {
  const [contact, setContact] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await fetch("/api/contact-info");
        if (!res.ok) throw new Error("Veri alınamadı");
        const data = await res.json();
        setContact(data[0]);
      } catch (err) {
        setError("İletişim bilgileri yüklenemedi.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, []);

  if (loading) return <p className="p-6 text-center">Yükleniyor...</p>;
  if (error) return <p className="p-6 text-center text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-5xl font-semibold mb-10 text-gray-800 tracking-tight">
        İletişim
      </h1>

      <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-10 space-y-4">
        {contact?.addresses?.map((item, index) => (
          <div key={index} className="flex items-center space-x-3">
            <FaMapMarkerAlt className="text-blue-500 w-6 h-6" />
            <span>
              <strong>{item.label}:</strong> {item.address}
            </span>
          </div>
        ))}

        {contact?.emails?.map((email, index) => (
          <div key={index} className="flex items-center space-x-3">
            <FaEnvelope className="text-blue-500 w-6 h-6" />
            <a className="text-blue-500 font-semibold" href={`mailto:${email}`}>
              {email}
            </a>
          </div>
        ))}

        {contact?.phones?.map((phone, index) => (
          <div key={index} className="flex items-center space-x-3">
            <FaPhone className="text-blue-500 w-6 h-6" />
            <span>{phone}</span>
          </div>
        ))}
      </div>

      <div className="mb-10 space-y-8">
        {contact?.mapEmbeds?.map((map, index) => (
          <div key={map._id || index}>
            <h2 className="text-xl font-bold text-gray-700 mb-2">
              {map.label === "Türkiye"
                ? "🇹🇷 "
                : map.label === "Almanya"
                ? "🇩🇪 "
                : ""}
              {map.label} Ofis
            </h2>
            <iframe
              src={map.url}
              width="100%"
              height="400"
              loading="lazy"
              className="rounded-lg shadow-md"
              title={`Harita - ${map.label}`}
            ></iframe>
          </div>
        ))}
      </div>

      <form className="bg-gray-50 p-6 rounded-lg shadow-md space-y-6">
        <div className="flex items-center space-x-3">
          <FaUser className="text-blue-500 w-6 h-6" />
          <input
            id="name"
            name="name"
            type="text"
            required
            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Adınızı girin"
          />
        </div>

        <div className="flex items-center space-x-3">
          <FaEnvelope className="text-blue-500 w-6 h-6" />
          <input
            id="email"
            name="email"
            type="email"
            required
            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="E-posta adresinizi girin"
          />
        </div>

        <div className="flex items-center space-x-3">
          <FaPaperPlane className="text-blue-500 w-6 h-6" />
          <textarea
            id="message"
            name="message"
            required
            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Mesajınızı yazın"
          ></textarea>
        </div>

        <button
          type="submit"
          className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-gray-100 font-semibold rounded-md shadow-md transition transform hover:bg-blue-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <FaPaperPlane />
          <span>Gönder</span>
        </button>
      </form>
    </div>
  );
}
