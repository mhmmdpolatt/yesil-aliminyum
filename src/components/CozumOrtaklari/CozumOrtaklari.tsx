import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

function CozumOrtum() {
  const t = useTranslations("CozumOrtaklari");
  // Component adını CozumOrtum olarak değiştirdim
  const partnerLogos = [
    {
      src: "https://placehold.co/180x90/E0E0E0/333333/png?text=Global+Alu",
      alt: "Global Alüminyum Çözümleri",
      link: "#",
    },
    {
      src: "https://placehold.co/180x90/D0D0D0/444444/png?text=Innovate+Metals",
      alt: "Yenilikçi Metal Ürünleri",
      link: "#",
    },
    {
      src: "https://placehold.co/180x90/C0C0C0/555555/png?text=Forge+Corp",
      alt: "Forge Kurumsal Grubu",
      link: "#",
    },
    {
      src: "https://placehold.co/180x90/B0B0B0/666666/png?text=AluTech+Solutions",
      alt: "AluTech Teknoloji Çözümleri",
      link: "#",
    },
    {
      src: "https://placehold.co/180x90/A0A0A0/777777/png?text=Precision+Alloys",
      alt: "Hassas Alaşım Üretimi",
      link: "#",
    },
    {
      src: "https://placehold.co/180x90/909090/888888/png?text=Elite+Extrusions",
      alt: "Elite Profil Ekstrüzyon",
      link: "#",
    },
    {
      src: "https://placehold.co/180x90/808080/999999/png?text=Future+Metals",
      alt: "Gelecek Metal Teknolojileri",
      link: "#",
    },
    {
      src: "https://placehold.co/180x90/707070/AAAAAA/png?text=Dynamic+Profiles",
      alt: "Dinamik Profil Sistemleri",
      link: "#",
    },
    {
      src: "https://placehold.co/180x90/606060/BBBBBB/png?text=Metal+Innovators",
      alt: "Metal Yenilikçileri",
      link: "#",
    },
    {
      src: "https://placehold.co/180x90/505050/CCCCCC/png?text=Apex+Solutions",
      alt: "Apex Çözümleri",
      link: "#",
    },
  ];

  return (
    <section className="py-16 bg-[#334155] mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Sol Başlık */}
        <div className="md:w-1/4 w-full text-center md:text-left flex-shrink-0">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            {t("cozumOrtaklari")}
          </h2>
        </div>

        {/* Sağ Kaydırılabilir Logolar */}
        <div className="md:w-3/4 w-full overflow-x-auto whitespace-nowrap custom-scrollbar">
          <div className="inline-flex items-center gap-x-12 py-4">
            {partnerLogos.map((partner, index) => (
              <div key={index} className="flex-shrink-0 inline-block">
                <a
                  href={partner.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-60 hover:opacity-100 transition-opacity duration-300"
                >
                  <Image
                    src={partner.src}
                    alt={partner.alt}
                    width={180}
                    height={90}
                    objectFit="contain"
                    className="grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CozumOrtum;
