// Simple admin authentication
// For production, integrate with a proper auth system (NextAuth, Clerk, etc.)

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";

export function validateAdminCredentials(username: string, password: string): boolean {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

export function getAdminToken(username: string, password: string): string | null {
  if (validateAdminCredentials(username, password)) {
    // Simple token generation (in production use JWT)
    return Buffer.from(`${username}:${Date.now()}`).toString("base64");
  }
  return null;
}

export function validateAdminToken(token: string): boolean {
  try {
    // Very basic validation (in production use proper JWT validation)
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const [username] = decoded.split(":");
    return username === ADMIN_USERNAME;
  } catch {
    return false;
  }
}

export function getAdminFromRequest(req: Request): boolean {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return false;
  }
  const token = authHeader.substring(7);
  return validateAdminToken(token);
}
