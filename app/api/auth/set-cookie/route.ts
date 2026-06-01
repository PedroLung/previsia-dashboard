// app/api/auth/set-cookie/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    const response = NextResponse.json({ success: true });

    response.cookies.set("previsia_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 dias
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao salvar token" },
      { status: 500 },
    );
  }
}
