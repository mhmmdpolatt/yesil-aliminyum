import React from "react";
import resim1 from "../../../public/images/allhotel.jpeg";
import resim2 from "../../../public/images/hotel.jpeg";
import resim3 from "../../../public/images/monche.jpeg";
import resim4 from "../../../public/images/waldheim.jpeg";

import Image from "next/image";

function HomeHeroSectionBottom() {
  return (
    <div className="hidden  absolute -bottom-32  z-30 md:flex justify-center gap-x-12 w-full">
      {/* Her bir görsel için kapsayıcı div */}
      <div
        className="relative w-[18%] h-[8%]  aspect-square  overflow-hidden shadow-xl 
                      transform transition-all duration-300 hover:scale-105 hover:shadow-2xl 
                      border-2 border-white  hover:border-blue-500"
      >
        <Image
          src={resim1}
          alt="PROJE 1 Açıklama"
          layout="fill" // Kapsayıcı div'i doldurur
          objectFit="cover" // Resmi kapsayıcının en boy oranına göre sığdırır
          className="rounded-2xl" // Görselin kendisi de daire şeklinde olacak
        />
        {/* Proje Başlığı Overlay (İsteğe bağlı, üzerine gelince görünür) */}
        <div
          className="absolute inset-0 bg-black/45 bg-opacity-0 hover:bg-opacity-50 
                        transition-opacity duration-300 flex items-center justify-center backdrop-blur-[0.5px]"
        >
          <p className="text-white text-lg font-bold opacity-0 hover:opacity-100 transition-opacity">
            PROJE 1
          </p>
        </div>
      </div>

      <div
        className="relative w-[18%] h-[8%] aspect-square  overflow-hidden shadow-xl 
                      transform transition-all duration-300 hover:scale-105 hover:shadow-2xl 
                      border-2 border-white hover:border-blue-500"
      >
        <Image
          src={resim2}
          alt="PROJE 2 Açıklama"
          layout="fill"
          objectFit="cover"
          className="rounded-2xl"
        />
        <div
          className="absolute inset-0 bg-black/45 bg-opacity-10 hover:bg-opacity-50 
                        transition-opacity duration-300 flex items-center justify-center"
        >
          <p className="text-white text-lg font-bold opacity-0 hover:opacity-100 transition-opacity">
            PROJE 2
          </p>
        </div>
      </div>

      <div
        className="relative w-[18%] h-[8%] aspect-square  overflow-hidden shadow-xl 
                      transform transition-all duration-300 hover:scale-105 hover:shadow-2xl 
                      border-2 border-white hover:border-blue-500"
      >
        <Image
          src={resim3}
          alt="PROJE 3 Açıklama"
          layout="fill"
          objectFit="cover"
          className="rounded-2xl"
        />
        <div
          className="absolute inset-0 bg-black/45 bg-opacity-0 hover:bg-opacity-50 
                        transition-opacity duration-300 flex items-center justify-center"
        >
          <p className="text-white text-lg font-bold opacity-0 hover:opacity-100 transition-opacity">
            PROJE 3
          </p>
        </div>
      </div>

      <div
        className="relative w-[18%] h-[8%] aspect-square  overflow-hidden shadow-xl 
                      transform transition-all duration-300 hover:scale-105 hover:shadow-2xl 
                      border-2 border-white hover:border-blue-500"
      >
        <Image
          src={resim1} // Aynı görseli tekrar kullanıyoruz
          alt="PROJE 4 Açıklama"
          layout="fill"
          objectFit="cover"
          className="rounded-2xl"
        />
        <div
          className="absolute inset-0 bg-black/45 bg-opacity-0 hover:bg-opacity-50 
                        transition-opacity duration-300 flex items-center justify-center"
        >
          <p className="text-white text-lg font-bold opacity-0 hover:opacity-100 transition-opacity">
            PROJE 4
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomeHeroSectionBottom;
