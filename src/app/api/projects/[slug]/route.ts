import { NextResponse } from "next/server";
import dbConnect from "../../../../../lib/mongodb";
import Project from "../../../../../models/Project";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    await dbConnect();

    const { slug } = params;

    const project = await Project.findOne({ slug });

    if (!project) {
      return NextResponse.json(
        { success: false, message: "Proje bulunamadı." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: project,
    });
  } catch (error: unknown) {
    console.error("GET /api/projects/[slug] error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Sunucu hatası.",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
