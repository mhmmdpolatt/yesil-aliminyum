import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";

export default function WhatsAppButton() {
  const phoneNumber = "+49 172 6635 362"; // ← buraya kendi numaranı yaz (ülke koduyla)

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link
        href={`https://wa.me/${phoneNumber.replace(/\D/g, "")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg transition-colors"
      >
        <FaWhatsapp size={20} />
        <span>WhatsApp İletişim</span>
      </Link>
    </div>
  );
}
