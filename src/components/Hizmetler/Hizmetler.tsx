// components/HomeServicesPreview.jsx
"use client";

import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  MdWindow,
  MdMeetingRoom,
  MdArchitecture,
  MdOutlineConstruction,
} from "react-icons/md";

function HomeServicesPreview() {
  const t = useTranslations("HomeServicesPreview");

  const services = [
    {
      id: 1,
      icon: MdWindow,
      titleKey: "services.0.title",
      descriptionKey: "services.0.description",
      link: "/hizmetler/pr-fassade",
    },
    {
      id: 2,
      icon: MdArchitecture,
      titleKey: "services.1.title",
      descriptionKey: "services.1.description",
      link: "/hizmetler/havalandirmali-cephe",
    },
    {
      id: 3,
      icon: MdMeetingRoom,
      titleKey: "services.2.title",
      descriptionKey: "services.2.description",
      link: "/hizmetler/yangin-kapilari",
    },
    {
      id: 4,
      icon: MdOutlineConstruction,
      titleKey: "services.3.title",
      descriptionKey: "services.3.description",
      link: "/hizmetler/ozel-konstruksiyonlar",
    },
    {
      id: 5,
      icon: MdOutlineConstruction,
      titleKey: "services.4.title",
      descriptionKey: "services.4.description",
      link: "/hizmetler/kaynak-sistemleri",
    },
  ];

  return (
    <section className="py-20 bg-[#F9FAFB] mt-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-[#2e7d32] mb-12">
          {t("title")}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {services.map((service) => (
            <article
              key={service.id}
              className="bg-white p-6  shadow-md border border-gray-200 flex flex-col items-center text-center 
                     transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl"
            >
              {/* İkon */}
              <div className="text-[#2e7d32] mb-4">
                <service.icon size={60} aria-hidden="true" />
              </div>

              {/* Başlık */}
              <h3
                className="text-xl font-semibold text-gray-800 mb-3"
                aria-label={t(service.titleKey)}
              >
                {t(service.titleKey)}
              </h3>

              {/* Açıklama */}
              <p className="text-gray-600 text-base leading-relaxed mb-6">
                {t(service.descriptionKey)}
              </p>

              {/* Daha Fazla Buton */}
              <Link
                href="/"
                className="inline-flex items-center px-5 py-2.5 bg-[#2e7d32] text-white rounded-xl 
                         hover:bg-[#276c2b] transition-colors duration-300"
                aria-label={`${t(service.titleKey)} - ${t("buttonText")}`}
              >
                {t("buttonText")}
                <svg
                  className="ml-2 -mr-1 w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 15.707a1 1 0 010-1.414L13.586 11H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomeServicesPreview;
