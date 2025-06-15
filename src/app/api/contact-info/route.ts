// src/app/api/contact-info/route.ts

import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/mongodb";
import ContactInfo from "../../../../models/ContactInfo";

// İstek tipi:
// {
//   "addresses": [{ "label": "...", "address": "..." }],
//   "emails": ["email@example.com"],
//   "phones": ["123-123-1234"],
//   "mapEmbedUrl": "https://..."
// }
export async function POST(req: Request) {
  try {
    // Veritabanına bağlan
    await dbConnect();

    // İstek gövdesini parse et
    const data = await req.json();

    // Contact oluştur
    const contact = await ContactInfo.create(data);

    return NextResponse.json(contact, { status: 201 });
  } catch (error) {
    console.error("POST /api/contact-info Hatası:", error);
    return NextResponse.json(
      { message: "Sunucu hatasında oluşturulamadı.", error },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    await dbConnect();
    const contacts = await ContactInfo.find().sort({ createdAt: -1 }); // son eklenen en başta

    return NextResponse.json(contacts, { status: 200 });
  } catch (error) {
    console.error("GET /api/contact-info Hatası:", error);
    return NextResponse.json(
      { message: "Veriler alınamadı.", error },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    await dbConnect();

    const searchParams = new URL(req.url).searchParams;
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "ID parametresi gerekli." },
        { status: 400 }
      );
    }

    const deleted = await ContactInfo.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { message: "Kayıt bulunamadı." },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Kayıt silindi." }, { status: 200 });
  } catch (error) {
    console.error("DELETE /api/contact-info Hatası:", error);
    return NextResponse.json(
      { message: "Sunucu hatası, silinemedi.", error },
      { status: 500 }
    );
  }
}
export async function PUT(req: Request) {
  try {
    await dbConnect();

    const searchParams = new URL(req.url).searchParams;
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { message: "ID parametresi gerekli." },
        { status: 400 }
      );
    }

    const data = await req.json();

    // findByIdAndUpdate ile güncelle, yeni dönen document olsun
    const updated = await ContactInfo.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!updated) {
      return NextResponse.json(
        { message: "Kayıt bulunamadı." },
        { status: 404 }
      );
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("PUT /api/contact-info Hatası:", error);
    return NextResponse.json(
      { message: "Sunucu hatası, güncellenemedi.", error },
      { status: 500 }
    );
  }
}
