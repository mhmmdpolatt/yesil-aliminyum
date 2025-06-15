"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminPage() {
  const pathname = usePathname();
  const locale = pathname?.split("/")[1] || "tr"; // fallback locale

  return (
    <div className="max-w-4xl mx-auto py-20 px-6">
      <h1 className="text-4xl font-bold mb-10 text-center text-[#2E7D32]">
        Admin Paneli
      </h1>

      <p className="text-gray-600 text-lg text-center mb-12">
        Hoş geldiniz! Buradan projeleri ve ekip üyelerini yönetebilir, genel
        istatistikleri admin dashboard üzerinden görebilirsiniz.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Link href={`/${locale}/admin/proje-ekle`}>
          <div className="p-6 bg-white rounded-xl border shadow-md hover:shadow-lg transition hover:-translate-y-1 cursor-pointer text-center">
            <h2 className="text-xl font-semibold text-[#2E7D32] mb-2">
              Proje Ekle
            </h2>
            <p className="text-gray-600 text-sm">
              Yeni bir proje oluşturun ve yayınlayın.
            </p>
          </div>
        </Link>

        <Link href={`/${locale}/admin/team-member-ekle`}>
          <div className="p-6 bg-white rounded-xl border shadow-md hover:shadow-lg transition hover:-translate-y-1 cursor-pointer text-center">
            <h2 className="text-xl font-semibold text-[#2E7D32] mb-2">
              Ekip Üyesi Ekle
            </h2>
            <p className="text-gray-600 text-sm">
              Ekibinize yeni bir üye ekleyin.
            </p>
          </div>
        </Link>
        <Link href={`/${locale}/admin/proje-liste`}>
          <div className="p-6 bg-white rounded-xl border shadow-md hover:shadow-lg transition hover:-translate-y-1 cursor-pointer text-center">
            <h2 className="text-xl font-semibold text-[#2E7D32] mb-2">
              Proje Listele/Sil
            </h2>
            <p className="text-gray-600 text-sm">
              Mevcut projelerinizi görüntüleyin.Silme işlemi geri alınamaz,
              lütfen dikkatli olun.
            </p>
          </div>
        </Link>
        <Link href={`/${locale}/admin/ekip-liste`}>
          <div className="p-6 bg-white rounded-xl border shadow-md hover:shadow-lg transition hover:-translate-y-1 cursor-pointer text-center">
            <h2 className="text-xl font-semibold text-[#2E7D32] mb-2">
              Ekip Listele /Sil
            </h2>
            <p className="text-gray-600 text-sm">
              Mevcut ekip üyelerinizi görüntüleyin.Silme işlemi geri alınamaz,
              lütfen dikkatli olun.
            </p>
          </div>
        </Link>
        <Link href={`/${locale}/admin/register`}>
          <div className="p-6 bg-white rounded-xl border shadow-md hover:shadow-lg transition hover:-translate-y-1 cursor-pointer text-center">
            <h2 className="text-xl font-semibold text-[#2E7D32] mb-2">
              Panel İçin Kullanıcı Ekle
            </h2>
            <p className="text-gray-600 text-sm">
              Admin paneline erişim için yeni kullanıcılar ekleyin.
            </p>
          </div>
        </Link>
        <Link href={`/${locale}/admin/iletisim-ekle`}>
          <div className="p-6 bg-white rounded-xl border shadow-md hover:shadow-lg transition hover:-translate-y-1 cursor-pointer text-center">
            <h2 className="text-xl font-semibold text-[#2E7D32] mb-2">
              İletişim Bilgisi Ekle
            </h2>
            <p className="text-gray-600 text-sm">iletişim bilgileri ekleyin.</p>
          </div>
        </Link>
        <Link href={`/${locale}/admin/iletisim-liste`}>
          <div className="p-6 bg-white rounded-xl border shadow-md hover:shadow-lg transition hover:-translate-y-1 cursor-pointer text-center">
            <h2 className="text-xl font-semibold text-[#2E7D32] mb-2">
              İletişim listele/sil/güncelle
            </h2>
            <p className="text-gray-600 text-sm">ilteişim</p>
          </div>
        </Link>

        <Link href={`/${locale}/admin/dashboard`}>
          <div className="p-6 bg-white rounded-xl border shadow-md hover:shadow-lg transition hover:-translate-y-1 cursor-pointer text-center">
            <h2 className="text-xl font-semibold text-[#2E7D32] mb-2">
              Admin Dashboard
            </h2>
            <p className="text-gray-600 text-sm">
              Sisteme genel bakış, istatistikler ve kontrol paneli.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
