const DEVANAGARI_DIGITS = "०१२३४५६७८९";

function toDevanagariDigits(n: number): string {
  return String(n).split("").map((d) => DEVANAGARI_DIGITS[+d] ?? d).join("");
}

export function relativeTimeNe(date: Date): string {
  const mins = Math.floor((Date.now() - date.getTime()) / 60000);
  if (mins < 1) return "अहिले भर्खर";
  if (mins < 60) return `${toDevanagariDigits(mins)} मिनेट अघि`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${toDevanagariDigits(hrs)} घण्टा अघि`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${toDevanagariDigits(days)} दिन अघि`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${toDevanagariDigits(months)} महिना अघि`;
  return `${toDevanagariDigits(Math.floor(months / 12))} वर्ष अघि`;
}

export function relativeTimeEn(date: Date): string {
  const mins = Math.floor((Date.now() - date.getTime()) / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}
