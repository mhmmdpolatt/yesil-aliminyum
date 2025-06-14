import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { writeFile } from "fs/promises";
import dbConnect from "../../../../lib/mongodb";
import Team from "../../../../models/Team"; // Adjust the import path as necessary

export async function GET() {
  await dbConnect();

  const teams = await Team.find().sort({ createdAt: -1 });
  return NextResponse.json({ success: true, data: teams });
}

export async function POST(req: Request) {
  try {
    await dbConnect();

    const formData = await req.formData();

    const file = formData.get("file") as File | null;
    const name = formData.get("name") as string;
    const position = formData.get("position") as string;

    if (!file || !file.name) {
      return NextResponse.json(
        { success: false, message: "Resim yüklenmeli." },
        { status: 400 }
      );
    }

    if (!name || !position) {
      return NextResponse.json(
        { success: false, message: "İsim ve pozisyon zorunlu." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "public/uploads/team");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const uploadPath = path.join(uploadDir, file.name);
    await writeFile(uploadPath, buffer);

    const imageSrc = `/uploads/team/${file.name}`;

    const newMember = new Team({
      name,
      position,
      imageSrc,
    });

    await newMember.save();

    return NextResponse.json({
      success: true,
      message: "Ekip üyesi başarıyla eklendi.",
      data: newMember,
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Sunucu hatası", error: error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/team?id=ekip-uyesi-id
export async function DELETE(req: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID parametresi gerekli." },
        { status: 400 }
      );
    }

    const teamMember = await Team.findById(id);

    if (!teamMember) {
      return NextResponse.json(
        { success: false, message: "Ekip üyesi bulunamadı." },
        { status: 404 }
      );
    }

    // Dosya yolunu oluştur
    const imagePath = path.join(process.cwd(), "public", teamMember.imageSrc);

    // Dosyayı sil (varsa)
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    // Veritabanından sil
    await Team.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Ekip üyesi ve resmi başarıyla silindi.",
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Sunucu hatası", error: error.message },
      { status: 500 }
    );
  }
}
