import { getAdminToken, validateAdminCredentials } from "@/lib/admin/auth";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return Response.json({ error: "Username and password required" }, { status: 400 });
    }

    if (!validateAdminCredentials(username, password)) {
      return Response.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = getAdminToken(username, password);
    if (!token) {
      return Response.json({ error: "Token generation failed" }, { status: 500 });
    }

    return Response.json({ token, message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error);
    return Response.json({ error: "Login failed" }, { status: 500 });
  }
}
