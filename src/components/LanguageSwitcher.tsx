"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { useLocale } from "next-intl";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const activeLocale = useLocale();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="relative w-40">
      <select
        onChange={handleChange}
        value={activeLocale}
        className="
      w-full
      appearance-none
      bg-white dark:bg-gray-800
      text-gray-800 dark:text-white
      border border-gray-300 dark:border-gray-600
      rounded-lg
      py-2 px-4 pr-10
      shadow-sm
      text-sm
      font-medium
      focus:outline-none
      focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500
      transition duration-200
      cursor-pointer
    "
      >
        {routing.locales.map((locale) => (
          <option key={locale} value={locale}>
            {locale === "tr" && "🇹🇷 Türkçe"}
            {locale === "en" && "🇬🇧 English"}
            {locale === "de" && "🇩🇪 Deutsch"}
          </option>
        ))}
      </select>

      {/* Aşağı ok ikonu (dropdown için) */}
      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400 dark:text-gray-300">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
}
