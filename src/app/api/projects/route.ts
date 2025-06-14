import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import fs from "fs/promises";
import mongoose from "mongoose";
import Project from "../../../../models/Project"; // Adjust the import path as necessary
import dbConnect from "../../../../lib/mongodb";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const formData = await req.formData();

    const file = formData.get("file") as File | null;
    const slug = formData.get("slug") as string;
    const language = formData.get("language") as string;

    if (!file || !file.name) {
      return NextResponse.json(
        { success: false, message: "Dosya yüklenmedi." },
        { status: 400 }
      );
    }

    if (!slug) {
      return NextResponse.json(
        { success: false, message: "Slug alanı zorunludur." },
        { status: 400 }
      );
    }

    const title = {
      tr: formData.get("title_tr") as string,
      en: formData.get("title_en") as string,
      de: formData.get("title_de") as string,
    };

    const description = {
      tr: formData.get("description_tr") as string,
      en: formData.get("description_en") as string,
      de: formData.get("description_de") as string,
    };

    const buttonText = {
      tr: formData.get("buttonText_tr") as string,
      en: formData.get("buttonText_en") as string,
      de: formData.get("buttonText_de") as string,
    };

    // Boş alan kontrolü (ekstra güvenlik)
    const requiredFields = [
      title.tr,
      title.en,
      title.de,
      description.tr,
      buttonText.tr,
    ];
    if (requiredFields.some((val) => !val || val.trim() === "")) {
      return NextResponse.json(
        { success: false, message: "Lütfen gerekli tüm alanları doldurun." },
        { status: 400 }
      );
    }

    // Dosyayı kaydet
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadPath = path.join(process.cwd(), "public/uploads", file.name);

    await writeFile(uploadPath, buffer);
    const imageSrc = `/uploads/${file.name}`;

    // MongoDB'ye kaydet
    const newProject = new Project({
      title,
      description,
      buttonText,
      imageSrc,
      slug,
      language: language || "multi",
    });

    await newProject.save();

    return NextResponse.json({
      success: true,
      message: "Proje başarıyla oluşturuldu.",
      data: {
        id: newProject._id,
        slug: newProject.slug,
        imageSrc: newProject.imageSrc,
      },
    });
  } catch (err: unknown) {
    console.error("POST /api/projects error:", err);

    return NextResponse.json(
      {
        success: false,
        message: "Sunucu hatası oluştu. Lütfen tekrar deneyin.",
        error: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}
export async function GET() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);

    const projects = await Project.find().sort({ createdAt: -1 }); // Yeni kayıtlar en üstte

    return NextResponse.json({ success: true, projects });
  } catch (error) {
    console.error("Hata:", error);
    return NextResponse.json(
      { success: false, message: "Veri çekilemedi." },
      { status: 500 }
    );
  }
}
export async function DELETE(req: Request) {
  try {
    // Veritabanına bağlan
    await dbConnect();

    // Body'den _id alın
    const { _id } = await req.json();

    if (!_id) {
      return NextResponse.json(
        { success: false, message: "id alanı zorunludur." },
        { status: 400 }
      );
    }

    // Projeyi bul
    const project = await Project.findById(_id);

    if (!project) {
      return NextResponse.json(
        { success: false, message: "Proje bulunamadı." },
        { status: 404 }
      );
    }

    // Görseli sil
    if (project.imageSrc) {
      const imagePath = path.join(process.cwd(), "public", project.imageSrc);

      try {
        await fs.unlink(imagePath);
        console.log("Görsel silindi:", imagePath);
      } catch (fsError) {
        console.warn("Görsel silinemedi veya bulunamadı:", fsError);
      }
    }

    // Projeyi MongoDB'den sil
    await Project.findByIdAndDelete(_id);

    return NextResponse.json({
      success: true,
      message: "Proje başarıyla silindi.",
    });
  } catch (error: unknown) {
    console.error("DELETE /api/projects/delete hatası:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Sunucu hatası oluştu.",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
