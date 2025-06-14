"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { FaIndustry, FaCogs, FaShieldAlt, FaTruck } from "react-icons/fa";
import { RiTeamFill } from "react-icons/ri";

export default function HizmetStandardıKalite() {
  const t = useTranslations("HizmetStandartlariKalite");

  const services = [
    {
      icon: <FaIndustry size={40} aria-hidden="true" />,
      title: t("services.0.title"),
      desc: t("services.0.desc"),
    },
    {
      icon: <FaCogs size={40} aria-hidden="true" />,
      title: t("services.1.title"),
      desc: t("services.1.desc"),
    },
    {
      icon: <FaShieldAlt size={40} aria-hidden="true" />,
      title: t("services.2.title"),
      desc: t("services.2.desc"),
    },
    {
      icon: <FaTruck size={40} aria-hidden="true" />,
      title: t("services.3.title"),
      desc: t("services.3.desc"),
    },
    {
      icon: <RiTeamFill size={40} aria-hidden="true" />,
      title: t("services.4.title"),
      desc: t("services.4.desc"),
    },
  ];

  return (
    <section className="py-20 bg-[#F4F4F4] md:mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-[#2e7d32] mb-12">
          {t("title")}
        </h2>

        <div className="flex flex-wrap justify-center gap-6">
          {services.map((service, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300
                         px-6 py-10 w-full sm:w-[90%] md:w-[45%] lg:w-[30%] xl:w-[22%] flex flex-col items-center text-center"
            >
              <div className="mb-4 text-[#2e7d32]">{service.icon}</div>
              <h3
                className="text-lg font-semibold text-gray-800 mb-2"
                aria-label={service.title}
              >
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm">{service.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
