import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../../../models/Users"; // User model importu
import dbConnect from "../../../../lib/mongodb"; // Veritabanı bağlantısı için helper

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = "1h"; // 1 saat geçerli token süresi

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

    const user = await User.findOne({ kullaniciAdi });

    if (!user) {
      return NextResponse.json(
        { message: "Kullanıcı bulunamadı." },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(parola, user.parola);
    if (!isPasswordValid) {
      return NextResponse.json({ message: "Parola yanlış." }, { status: 401 });
    }

    // JWT oluştur
    const token = jwt.sign(
      { userId: user._id, kullaniciAdi: user.kullaniciAdi },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    // Token'ı cookie olarak gönder (HttpOnly, secure yapabilirsin)
    const response = NextResponse.json({ message: "Giriş başarılı", token });

    // Örnek: cookie ayarı (prod ortamda secure:true olmalı)
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60, // 1 saat
      path: "/",
      sameSite: "lax",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Sunucu hatası." }, { status: 500 });
  }
}
