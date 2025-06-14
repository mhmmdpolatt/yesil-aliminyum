"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

interface TeamMember {
  _id: string;
  name: string;
  position: string;
  imageSrc: string;
}

export default function EkipListe() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/team")
      .then((res) => res.json())
      .then((data) => {
        setTeam(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Veri alınamadı:", err);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: string) => {
    const onay = confirm("Bu ekip üyesini silmek istediğinize emin misiniz?");
    if (!onay) return;

    try {
      const res = await fetch(`/api/team?id=${id}`, { method: "DELETE" });
      const result = await res.json();

      if (result.success) {
        setTeam((prev) => prev.filter((member) => member._id !== id));
      } else {
        alert(result.message || "Silme işlemi başarısız oldu.");
      }
    } catch (error) {
      console.error("Silme hatası:", error);
      alert("Sunucu hatası.");
    }
  };

  if (loading) return <p>Yükleniyor...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Ekip Listesi</h1>
      <p className="mb-6">
        Burada ekip üyelerinizi görüntüleyebilir ve silebilirsiniz. Silme işlemi
        geri alınamaz, lütfen dikkatli olun.
      </p>
      <Link href="/admin/dashboard">
        <button className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Panele Dön
        </button>
      </Link>

      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">Görsel</th>
            <th className="p-2 border">İsim</th>
            <th className="p-2 border">Pozisyon</th>
            <th className="p-2 border">İşlem</th>
          </tr>
        </thead>
        <tbody>
          {team.map((member) => (
            <tr key={member._id}>
              <td className="p-2 border">
                <Image
                  src={member.imageSrc}
                  alt={member.name}
                  width={80}
                  height={80}
                  className="object-cover rounded"
                />
              </td>
              <td className="p-2 border">{member.name}</td>
              <td className="p-2 border">{member.position}</td>
              <td className="p-2 border">
                <button
                  onClick={() => handleDelete(member._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Sil
                </button>
              </td>
            </tr>
          ))}
          {team.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center p-4">
                Hiç ekip üyesi yok.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
