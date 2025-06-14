"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../../public/images/logo3.jpeg";
import { useTranslations } from "next-intl";

import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

import "leaflet/dist/images/marker-icon-2x.png";
import "leaflet/dist/images/marker-shadow.png";

// Lazy load leaflet components
const MapContainer = React.lazy(() =>
  import("react-leaflet").then((module) => ({ default: module.MapContainer }))
);
const TileLayer = React.lazy(() =>
  import("react-leaflet").then((module) => ({ default: module.TileLayer }))
);
const Marker = React.lazy(() =>
  import("react-leaflet").then((module) => ({ default: module.Marker }))
);
const Popup = React.lazy(() =>
  import("react-leaflet").then((module) => ({ default: module.Popup }))
);

let L;
if (typeof window !== "undefined") {
  L = require("leaflet");

  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "/marker-icon-2x.png",
    iconUrl: "/marker-icon.png",
    shadowUrl: "/marker-shadow.png",
  });
}

function Footer() {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const t = useTranslations("footer");

  useEffect(() => {
    setIsMapLoaded(true);
  }, []);

  const position = [40.9185, 38.3896];

  const quickLinks = [
    { name: "Anasayfa", href: "/" },
    { name: "Hakkımızda", href: "/hakkimizda" },
    { name: "Projeler", href: "/projeler" },
    { name: "Hizmetler", href: "/hizmetler" },
    { name: "İletişim", href: "/iletisim" },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      icon: FaFacebookF,
      href: "https://www.facebook.com/yesilaluminyum",
    },
    {
      name: "Instagram",
      icon: FaInstagram,
      href: "https://www.instagram.com/yesilaluminyum",
    },
    {
      name: "LinkedIn",
      icon: FaLinkedinIn,
      href: "https://www.linkedin.com/company/yesilaluminyum",
    },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 w-screen text-gray-400 py-12 mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo ve açıklama */}
          <div className="col-span-1">
            <Link href="/" className="flex items-center mb-4 space-x-2">
              <Image
                src={Logo}
                alt="Logo"
                width={150}
                height={40}
                className="h-10 w-auto"
              />
              <h1 className="text-emerald-400 font-bold text-2xl">
                Yeşil Alüminyum
              </h1>
            </Link>
            <p className="text-sm leading-relaxed">{t("description")}</p>
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  className="text-gray-400 hover:text-green-500 transition-colors duration-200"
                >
                  <link.icon size={24} />
                </a>
              ))}
            </div>
          </div>

          {/* Hızlı Linkler */}
          <div className="col-span-1">
            <h3 className="text-xl font-semibold text-gray-100 mb-4">
              {t("quickLinks")}
            </h3>
            <ul>
              {quickLinks.map((link, index) => (
                <li key={index} className="mb-2">
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-green-500 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* İletişim */}
          <div className="col-span-1">
            <h3 className="text-xl font-semibold text-gray-100 mb-4">
              {t("contact")}
            </h3>
            <p className="mb-2">{t("address")}</p>
            <p className="mb-2">{t("phone")}</p>
            <p className="mb-2">{t("email")}</p>
            <p className="mb-2">{t("workingHours")}</p>
          </div>

          {/* Harita */}
          <div className="col-span-1">
            <h3 className="text-xl font-semibold text-gray-100 mb-4">
              {t("locationTitle")}
            </h3>
            <div className="w-full h-48 md:h-64 bg-gray-800 rounded-lg overflow-hidden">
              {isMapLoaded ? (
                <MapContainer
                  zoom={13}
                  scrollWheelZoom={false}
                  className="w-full h-full z-0"
                  style={{ zIndex: 0 }}
                  attributionControl={false}
                  zoomControl={false}
                  center={position}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={position}>
                    <Popup>{t("locationPopup")}</Popup>
                  </Marker>
                </MapContainer>
              ) : (
                <div className="flex items-center justify-center w-full h-full text-gray-400">
                  Harita Yükleniyor...
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Telif & Geliştirici */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-400">
          <p>
            &copy; {currentYear} {t("companyName")}. {t("copyright")}
          </p>
          <p className="mt-2">
            {t("developer")}:{" "}
            <a
              href="#"
              className="hover:text-green-500"
              target="_blank"
              rel="noopener noreferrer"
            >
              MHD.DEV | WIZARDS-TECH
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
