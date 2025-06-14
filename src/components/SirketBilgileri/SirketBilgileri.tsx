"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function CompanyStats() {
  const t = useTranslations("CompanyStats");
  const stats = t.raw("stats") as Array<{ value: string; label: string }>;

  return (
    <section className="py-20 bg-[#F4F4F4]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Başlık */}
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-[#2e7d32] mb-16">
          {t("title")}
        </h2>

        {/* İstatistik Kartları */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white rounded-xl p-8 shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300"
            >
              <p className="text-5xl font-bold text-[#2e7d32] mb-2">
                {stat.value}
              </p>
              <p className="text-gray-700 text-base font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Foto Galeri - Tam Genişlik */}
    </section>
  );
}
