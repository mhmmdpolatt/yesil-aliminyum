"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

interface TeamMember {
  _id: string;
  name: string;
  position: string;
  imageSrc: string;
}

export default function Hakkimizda() {
  const t = useTranslations("AboutPage");
  console.log("Translations:", t);

  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTeam() {
      try {
        const res = await fetch("/api/team");
        if (!res.ok) throw new Error(t("error"));
        const data = await res.json();
        setTeam(data.data || []);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchTeam();
  }, []);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#2E7D32] mb-4">
          {t("about")}
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {t("about_description")}
        </p>
      </div>

      {/* Tarihçe */}
      <div className="mb-12">
        <h2 className="text-3xl font-semibold mb-4 text-gray-800">
          {t("history_title")}
        </h2>
        <p className="text-gray-600 leading-relaxed">{t("history_text")}</p>
      </div>

      {/* Misyon, Vizyon, Değerler */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
        <div className="p-6 bg-gray-50 rounded-2xl shadow-md">
          <h3 className="text-2xl font-semibold mb-4 text-[#2E7D32]">
            {t("mission")}
          </h3>
          <p className="text-gray-600">{t("mission_text")}</p>
        </div>

        <div className="p-6 bg-gray-50 rounded-2xl shadow-md">
          <h3 className="text-2xl font-semibold mb-4 text-[#2E7D32]">
            {t("vision")}
          </h3>
          <p className="text-gray-600">{t("vision_text")}</p>
        </div>

        <div className="p-6 bg-gray-50 rounded-2xl shadow-md">
          <h3 className="text-2xl font-semibold mb-4 text-[#2E7D32]">
            {t("values")}
          </h3>
          <ul className="text-gray-600 list-inside list-disc">
            <li>{t("values_list.0")}</li>
            <li>{t("values_list.1")}</li>
            <li>{t("values_list.2")}</li>
            <li>{t("values_list.3")}</li>
            <li>{t("values_list.4")}</li>
          </ul>
        </div>
      </div>

      {/* Ekip */}
      <div>
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">
          {t("team_title")}
        </h2>

        {loading && <p className="text-center text-gray-500">{t("loading")}</p>}
        {error && <p className="text-center text-red-600">{error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {team.length === 0 && (
              <p className="text-center col-span-full text-gray-500">
                {t("no_team")}
              </p>
            )}

            {team.map((item) => (
              <div
                key={item._id}
                className="p-6 bg-gray-50 rounded-2xl shadow-md text-center"
              >
                <img
                  src={item.imageSrc}
                  alt={item.name}
                  className="rounded-full w-32 h-32 object-cover mb-4 mx-auto"
                />
                <h4 className="text-2xl font-semibold mb-1">{item.name}</h4>
                <p className="text-gray-500">{item.position}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
