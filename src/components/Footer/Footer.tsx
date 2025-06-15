"use client";

import React, { useEffect, useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../../public/images/logo3.jpeg";
import { useTranslations } from "next-intl";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

// Dinamik importlar (SSR kapalı)
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

// Tip tanımları
type MapEmbed = {
  label: string;
  url: string;
  _id?: string;
};

type Address = {
  label: string;
  address: string;
  _id?: string;
};

type ContactInfo = {
  addresses: Address[];
  phones: string[];
  emails: string[];
  mapEmbeds: MapEmbed[];
  workingHours?: string;
};

function Footer() {
  const t = useTranslations("footer");

  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [L, setL] = useState<typeof import("leaflet") | null>(null);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsMapLoaded(true);

    async function fetchContact() {
      try {
        const res = await fetch("/api/contact-info");
        if (!res.ok) throw new Error("Failed to fetch contact info");
        const data = await res.json();
        setContactInfo(data[0]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchContact();

    if (typeof window !== "undefined") {
      import("leaflet").then((leaflet) => {
        leaflet.Icon.Default.mergeOptions({
          iconRetinaUrl: "/marker-icon-2x.png",
          iconUrl: "/marker-icon.png",
          shadowUrl: "/marker-shadow.png",
        });
        setL(leaflet);
      });
    }
  }, []);

  const position: [number, number] = [40.9185, 38.3896];
  const currentYear = new Date().getFullYear();

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

  return (
    <footer className="bg-gray-900 w-screen text-gray-400 py-12 mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo ve Açıklama */}
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
              {socialLinks.map((link, idx) => (
                <a
                  key={idx}
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
              {quickLinks.map((link, idx) => (
                <li key={idx} className="mb-2">
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

          {/* İletişim Bilgileri */}
          <div className="col-span-1">
            <h3 className="text-xl font-semibold text-gray-100 mb-4">
              {t("contact")}
            </h3>

            {loading ? (
              <p>Yükleniyor...</p>
            ) : contactInfo ? (
              <>
                {/* Adresler */}
                {contactInfo.addresses.length > 0 &&
                  contactInfo.addresses.map((addr, i) => (
                    <p key={i} className="mb-2">
                      {addr.address}
                    </p>
                  ))}

                {/* Telefonlar */}
                {contactInfo.phones.length > 0 &&
                  contactInfo.phones.map((phone, i) => (
                    <p key={i} className="mb-2">
                      {phone}
                    </p>
                  ))}

                {/* E-mailler */}
                {contactInfo.emails.length > 0 &&
                  contactInfo.emails.map((email, i) => (
                    <p key={i} className="mb-2">
                      {email}
                    </p>
                  ))}

                {/* Çalışma Saatleri */}
                {contactInfo.workingHours && (
                  <p className="mb-2">{contactInfo.workingHours}</p>
                )}
              </>
            ) : (
              <p>İletişim bilgileri alınamadı.</p>
            )}
          </div>

          {/* Harita */}
          <div className="col-span-1">
            <h3 className="text-xl font-semibold text-gray-100 mb-4">
              {t("locationTitle")}
            </h3>
            <div className="w-full h-48 md:h-64 bg-gray-800 rounded-lg overflow-hidden">
              {isMapLoaded && L ? (
                <Suspense
                  fallback={
                    <div className="flex items-center justify-center w-full h-full text-gray-400">
                      Harita Yükleniyor...
                    </div>
                  }
                >
                  <MapContainer
                    center={position}
                    zoom={13}
                    scrollWheelZoom={false}
                    className="w-full h-full z-0"
                    style={{ zIndex: 0 }}
                    attributionControl={false}
                    zoomControl={false}
                  >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={position}>
                      <Popup>{t("locationPopup")}</Popup>
                    </Marker>
                  </MapContainer>
                </Suspense>
              ) : (
                <div className="flex items-center justify-center w-full h-full text-gray-400">
                  Harita Yükleniyor...
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Telif Hakkı ve Geliştirici */}
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
