import Image from "next/image";
import HeroImage from "../../../public/images/homehero.jpeg";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function HomeHeroSection() {
  const t = useTranslations("HomeHeroSection");
  return (
    <section className="relative h-[85vh] flex items-center justify-center text-white">
      {/* Arka Plan Görseli */}
      <div className="absolute inset-0 z-0">
        <Image
          src={HeroImage} // veya: "https://example.com/hero.jpg"
          alt="Yeşil Alüminyum Projesi"
          fill
          className="object-cover brightness-50"
          priority
        />
      </div>

      {/* İçerik */}
      <div className="relative z-10 text-center max-w-3xl px-4">
        <h1 className="text-4xl md:text-6xl font-bold drop-shadow-md">
          {t("motionh1")}
        </h1>
        <p className="mt-4 text-lg md:text-xl drop-shadow-sm">{t("motionp")}</p>

        <div className="mt-6 flex flex-col md:flex-row justify-center gap-4">
          <Link
            href="/contact"
            className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-xl text-sm font-semibold transition"
          >
            {t("motioncontackt")}
          </Link>
          <Link
            href="/projeler"
            className="border border-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-white hover:text-black transition"
          >
            {t("motiona1")}
          </Link>
        </div>
      </div>
    </section>
  );
}
