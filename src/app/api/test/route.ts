// app/api/test-connection/route.ts
import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/mongodb"; // Eğer başka yerdeyse yolu ayarla

export async function GET() {
  try {
    await dbConnect();
    return NextResponse.json(
      { status: "success", message: "MongoDB bağlantısı başarılı 🔥" },
      { status: 200 }
    );
  } catch (error) {
    console.error("MongoDB bağlantı hatası:", error);
    return NextResponse.json(
      { status: "error", message: "MongoDB bağlantı kurulamadı 😢", error },
      { status: 500 }
    );
  }
}
