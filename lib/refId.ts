import crypto from "crypto";

// 8 hex chars (~4.3 billion combinations) — unlike a short random digit
// suffix, this isn't practically guessable, which matters for anything a
// citizen uses to look up their own submission (e.g. grievance tracking).
export function genRefId(prefix: string): string {
  const suffix = crypto.randomBytes(4).toString("hex").toUpperCase();
  return `${prefix}-2082-${suffix}`;
}
