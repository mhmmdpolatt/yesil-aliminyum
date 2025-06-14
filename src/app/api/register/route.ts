import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "../../../../models/Users"; // User model importu
import Users from "../../../../models/Users";
import dbConnect from "../../../../lib/mongodb"; // az önce yazdığımız user modeli

// Veritabanı bağlantısı (örnek helper kullanılabilir)

export async function POST(req: Request) {
  try {
    await dbConnect();

    const { kullaniciAdi, parola } = await req.json();

    if (!kullaniciAdi || !parola) {
      return NextResponse.json(
        { message: "Kullanıcı adı ve parola zorunludur." },
        { status: 400 }
      );
    }

    const existingUser = await Users.findOne({ kullaniciAdi });

    if (existingUser) {
      return NextResponse.json(
        { message: "Bu kullanıcı adı zaten kayıtlı." },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(parola, 10);

    const newUser = new User({
      kullaniciAdi,
      parola: hashedPassword,
    });

    await newUser.save();

    return NextResponse.json(
      { message: "Kayıt başarılı", userId: newUser._id },
      { status: 201 }
    );
  } catch (err) {
    console.error("Kayıt hatası:", err);
    return NextResponse.json({ message: "Sunucu hatası" }, { status: 500 });
  }
}
