import React from "react";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaUser,
  FaPaperPlane,
} from "react-icons/fa";

export default function ContactPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Title */}
      <h1 className="text-5xl font-semibold mb-10 text-gray-800 tracking-tight">
        İletişim
      </h1>

      {/* Company Information */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-10 space-y-4">
        <div className="flex items-center space-x-3">
          <FaMapMarkerAlt className="text-blue-500 w-6 h-6" />
          <span>
            Giresun Ofis: Çıtlakkale Mahallesi İnönü Caddesi No: 181-183 İç Kapı
            No: 108 Merkez/GİRESUN
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <FaMapMarkerAlt className="text-blue-500 w-6 h-6" />
          <span>
            Almanya Ofis: Günzburger Straße 4, 89340 Leipheim, Germany
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <FaEnvelope className="text-blue-500 w-6 h-6" />
          <a
            className="text-blue-500 font-semibold"
            href="mailto:o.can@yesilaluminyum.com"
          >
            o.can@yesilaluminyum.com
          </a>
        </div>
        <div className="flex items-center space-x-3">
          <FaEnvelope className="text-blue-500 w-6 h-6" />
          <a
            className="text-blue-500 font-semibold"
            href="mailto:s.aydin@yesilaluminyum.com"
          >
            s.aydin@yesilaluminyum.com
          </a>
        </div>
        <div className="flex items-center space-x-3">
          <FaPhone className="text-blue-500 w-6 h-6" />
          <span>+49 172 6635 362</span>
        </div>
      </div>

      {/* Google Maps iframe */}
      <div className="mb-10">
        <iframe
          src="https://www.google.com/maps?q=Günzburger Straße 4, 89340 Leipheim, Germany&output=embed"
          width="100%"
          height="400"
          loading="lazy"
          className="rounded-lg shadow-md"
        ></iframe>
      </div>

      {/* Contact Form */}
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
