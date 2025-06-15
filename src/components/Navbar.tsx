"use client";

import { useState, useEffect } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";
import Image from "next/image";
import Logo3 from "../../public/images/YeşilAlüminyumLogo.png"; // Adjust the path as necessary
// Adjust the path as necessary
// Adjust the path as necessary
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTopBar, setShowTopBar] = useState(true);
  const t = useTranslations("Navbar");

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 50) {
        setShowTopBar(false);
      } else if (window.scrollY < lastScrollY) {
        setShowTopBar(true);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="relative">
      {/* Üst Bar */}
      <div
        className={`fixed top-0 left-0 right-0 h-10 bg-gray-100/80 backdrop-blur-md text-gray-700 flex justify-between items-center px-4 sm:px-6 z-50 transition-transform duration-300 ${
          showTopBar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="hidden sm:flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <FaPhoneAlt className="text-cyan-600" />
            <span>+49 172 6635 362</span>
          </div>
          <div className="flex items-center gap-1">
            <FaEnvelope className="text-cyan-600" />
            <span>s.aydin@yesilaluminyum.com</span>
          </div>
        </div>
        {<div className="flex items-center gap-4 text-sm"></div>}
        <LanguageSwitcher />
      </div>

      {/* Ana Navbar */}
      <nav
        className="fixed left-0 right-0 z-40 transition-all duration-300"
        style={{
          top: showTopBar ? "40px" : "0px",
          height: "64px",
        }}
      >
        <div className="bg-white backdrop-blur-xl shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <Link
                href="/"
                className="text-xl font-bold  flex items-center space-x-2"
              >
                <Image
                  src={Logo3}
                  alt="Yeşil Alüminyum Logo"
                  width={150}
                  height={40}
                  className="h-10"
                />
              </Link>

              {/* Desktop Menu */}
              <div className="hidden md:flex space-x-6   text-gray-700 text-lg font-bold">
                <Link
                  href="/"
                  className="hover:text-cyan-600 transition-all border-b-2 border-b-gray-400"
                >
                  {t("home")}
                </Link>
                <Link
                  href="/projeler"
                  className="hover:text-cyan-600 transition-all border-b-2 border-b-gray-400"
                >
                  {t("projects")}
                </Link>
                <Link
                  href="/about"
                  className="hover:text-cyan-600 transition-all border-b-2 border-b-gray-400"
                >
                  {t("about")}
                </Link>
                <Link
                  href="/contact"
                  className="hover:text-cyan-600 transition-all border-b-2 border-b-gray-400"
                >
                  {t("contact")}
                </Link>
              </div>

              {/* Hamburger */}
              <button
                className="md:hidden text-gray-700"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle Menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden bg-white px-4 py-4 space-y-2 border-t border-gray-200 text-sm">
              <Link
                href="/"
                className="block text-gray-700 hover:text-cyan-600"
              >
                {t("home")}
              </Link>
              <Link
                href="/about"
                className="block text-gray-700 hover:text-cyan-600"
              >
                {t("about")}
              </Link>
              <Link
                href="/contact"
                className="block text-gray-700 hover:text-cyan-600"
              >
                {t("contact")}
              </Link>
              <Link
                href="/projeler"
                className="hover:text-cyan-600 transition-all border-b-2 border-b-gray-400"
              >
                {t("projects")}
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Altında içerik varsa, header'ın altında boşluk bırak */}
      <div className="pt-[104px]" />
    </header>
  );
}
