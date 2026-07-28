import crypto from "crypto";

// Real admin auth: HMAC-SHA256-signed, expiring tokens — not a session store,
// not OAuth, just a single admin account gated properly. Requires
// ADMIN_USERNAME, ADMIN_PASSWORD, ADMIN_TOKEN_SECRET to be set; there is no
// insecure default fallback.

const TOKEN_TTL_MS = 8 * 60 * 60 * 1000; // 8 hours

export function isAdminAuthConfigured(): boolean {
  return Boolean(process.env.ADMIN_USERNAME && process.env.ADMIN_PASSWORD && process.env.ADMIN_TOKEN_SECRET);
}

function timingSafeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

function sign(payload: string): string | null {
  const secret = process.env.ADMIN_TOKEN_SECRET;
  if (!secret) return null;
  return crypto.createHmac("sha256", secret).update(payload).digest("base64url");
}

export function validateAdminCredentials(username: string, password: string): boolean {
  const expectedUser = process.env.ADMIN_USERNAME;
  const expectedPass = process.env.ADMIN_PASSWORD;
  if (!expectedUser || !expectedPass) return false;
  return timingSafeEqual(username, expectedUser) && timingSafeEqual(password, expectedPass);
}

export function getAdminToken(username: string, password: string): string | null {
  if (!validateAdminCredentials(username, password)) return null;
  const payload = `${username}:${Date.now() + TOKEN_TTL_MS}`;
  const sig = sign(payload);
  if (!sig) return null;
  return `${Buffer.from(payload).toString("base64url")}.${sig}`;
}

export function validateAdminToken(token: string): boolean {
  try {
    const [payloadB64, sig] = token.split(".");
    if (!payloadB64 || !sig) return false;
    const payload = Buffer.from(payloadB64, "base64url").toString("utf-8");
    const expectedSig = sign(payload);
    if (!expectedSig || !timingSafeEqual(sig, expectedSig)) return false;

    const [username, expiresStr] = payload.split(":");
    const expectedUser = process.env.ADMIN_USERNAME;
    if (!expectedUser || username !== expectedUser) return false;

    const expires = Number(expiresStr);
    if (!Number.isFinite(expires) || Date.now() > expires) return false;

    return true;
  } catch {
    return false;
  }
}

export function getAdminFromRequest(req: Request): boolean {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) return false;
  return validateAdminToken(authHeader.slice(7));
}
