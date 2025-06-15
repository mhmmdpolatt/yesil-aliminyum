import CozumOrtaklari from "@/components/CozumOrtaklari/CozumOrtaklari";
import Hakkimizda from "@/components/Hakkimizda/Hakkimizda";
import HomeServicesPreview from "@/components/Hizmetler/Hizmetler";
import HizmetStandardıKalite from "@/components/HizmetStandardıKalite/HizmetStandardıKalite";
import HomeHeroSection from "@/components/HomeHeroSection/HomeHeroSection";
import HomeHeroSectionBottom from "@/components/HomeHeroSectionBottom/HomeHeroSectionBottom";
import Projeler from "@/components/Projeler/Projeler";
import SirketBilgileri from "@/components/SirketBilgileri/SirketBilgileri";
// Örneğin, pages/_app.js veya layout.js dosyanızda
import "swiper/css";
import "swiper/css/autoplay"; // Otomatik kaydırma kullanacaksanız

export default function HomePage() {
  return (
    <div>
      <HomeHeroSection />
      <HomeHeroSectionBottom />
      <HomeServicesPreview />
      <Projeler />
      <HizmetStandardıKalite />
      {/* <CozumOrtaklari /> */}
      <SirketBilgileri />
      <Hakkimizda />
    </div>
  );
}
