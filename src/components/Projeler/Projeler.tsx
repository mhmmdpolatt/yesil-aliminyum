"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import SMSCAMPUS from "../../../public/images/monche.jpeg";
import HOTE from "../../../public/images/hotel.jpeg";
import All from "../../../public/images/allhotel.jpeg";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import foto1 from "../../../public/images/hakkimizda1.jpeg";
import foto2 from "../../../public/images/hakkimizda2.jpeg";
import foto3 from "../../../public/images/hakkimizda3.jpeg";

export default function FeaturedProjects() {
  const t = useTranslations("projects");
  const images = [foto1, foto2, foto3];
  const projects = [
    {
      id: "sms-campus",
      imageSrc: SMSCAMPUS,
      titleKey: "sms-campus.title",
      descriptionKey: "sms-campus.description",
      buttonTextKey: "sms-campus.buttonText",
    },
    {
      id: "comfort-hotel",
      imageSrc: HOTE,
      titleKey: "comfort-hotel.title",
      descriptionKey: "comfort-hotel.description",
      buttonTextKey: "comfort-hotel.buttonText",
    },
    {
      id: "zollamt-bonn",
      imageSrc: All,
      titleKey: "zollamt-bonn.title",
      descriptionKey: "zollamt-bonn.description",
      buttonTextKey: "zollamt-bonn.buttonText",
    },
  ];

  return (
    <section className="py-16 bg-[#F4F4F4] mt-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-[#2E7D32] mb-12">
          {t("title")} {/* ör.: "Projelerimiz" */}
        </h2>

        <div className="relative flex flex-nowrap overflow-x-auto snap-x snap-mandatory pb-8 custom-scrollbar">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex flex-col flex-shrink-0 
            w-[calc(100vw-2rem)] sm:w-[calc(100vw-4rem)] lg:w-[calc(100vw-8rem)] xl:w-[calc(100vw-12rem)] 
            md:flex-row items-center   
            p-6 md:p-8 snap-center 
            mx-2 sm:mx-4 lg:mx-6 xl:mx-8 
            bg-gray-50 rounded-2xl shadow-md border border-gray-200 
            transform transition-all duration-500 ease-in-out 
            hover:shadow-xl hover:-translate-y-1"
            >
              <div className="w-full md:w-1/2 relative h-64 md:h-96 rounded-xl overflow-hidden flex-shrink-0 mb-6 md:mb-0 md:mr-8">
                <Image
                  src={project.imageSrc}
                  alt={t(project.titleKey)}
                  fill
                  quality={90} // Kaliteyi %90 yap
                  className="object-cover rounded-xl transition-transform duration-500 ease-in-out hover:scale-105"
                />
                {/* Overlay karartma + blur */}
                <div className="absolute inset-0 rounded-xl bg-[#5c5c5c70] backdrop-blur-[1px] pointer-events-none"></div>
              </div>

              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <h3 className="text-3xl sm:text-4xl font-semibold text-[#1b1b1b] mb-4">
                  {t(project.titleKey)}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  {t(project.descriptionKey)}
                </p>
                <Link
                  href="/projeler"
                  className="self-start mt-4 px-6 py-3 
                bg-[#2E7D32] text-gray-50 font-semibold 
                hover:bg-[#276C2B] transition-all duration-500 
                rounded-md shadow-md transform hover:shadow-lg hover:translate-y-[-2px]"
                >
                  {t(project.buttonTextKey)}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-6 mt-12">
        <h1 className="text-3xl font-bold text-center text-[#2E7D32]">
          Galery
        </h1>
        {images.map((img, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="w-full overflow-hidden"
          >
            <Image
              src={img}
              alt={`Hakkımızda fotoğrafı ${index + 1}`}
              className="w-[82vw] mx-auto h-auto object-cover transition-transform duration-500 hover:scale-105"
              placeholder="blur"
              priority={index === 0}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
