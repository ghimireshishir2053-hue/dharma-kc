import { NextResponse } from "next/server";
import { getAdminToken, validateAdminCredentials, isAdminAuthConfigured } from "@/lib/admin/auth";

export async function POST(req: Request) {
  if (!isAdminAuthConfigured()) {
    console.error("[admin/login] ADMIN_USERNAME/ADMIN_PASSWORD/ADMIN_TOKEN_SECRET not set");
    return NextResponse.json({ error: "server_not_configured" }, { status: 500 });
  }

  const body = await req.json().catch(() => ({}));
  const { username, password } = body as Record<string, string>;
  if (!username || !password) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  if (!validateAdminCredentials(username, password)) {
    return NextResponse.json({ error: "invalid_credentials" }, { status: 401 });
  }

  const token = getAdminToken(username, password);
  if (!token) {
    return NextResponse.json({ error: "token_error" }, { status: 500 });
  }

  return NextResponse.json({ token });
}
