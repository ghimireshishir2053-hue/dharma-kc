// Thin wrapper around the Sparrow SMS API (https://docs.sparrowsms.com/sms/outgoing_sendsms/),
// Nepal's SMS gateway. Requires SPARROW_SMS_TOKEN and SPARROW_SMS_FROM env vars.

const SPARROW_URL = "https://api.sparrowsms.com/v2/sms/";

export type SmsResult = { ok: boolean; detail: string };

export async function sendSms(to: string, text: string): Promise<SmsResult> {
  const token = process.env.SPARROW_SMS_TOKEN;
  const from = process.env.SPARROW_SMS_FROM;

  // Sparrow SMS wants a 10-digit local number, no country code.
  const digits = to.replace(/\D/g, "").slice(-10);

  if (!token || !from) {
    console.warn(`[sms] SPARROW_SMS_TOKEN/SPARROW_SMS_FROM not set — would send to ${digits}: ${text}`);
    return { ok: false, detail: "sms_not_configured" };
  }
  if (digits.length !== 10) {
    return { ok: false, detail: "invalid_phone" };
  }

  try {
    const res = await fetch(SPARROW_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ token, from, to: digits, text }),
    });
    const data = await res.json().catch(() => null);
    if (res.ok && data?.response_code === 200) {
      return { ok: true, detail: `sent:${data.count ?? 1}` };
    }
    return { ok: false, detail: `sparrow_error:${data?.response_code ?? res.status}` };
  } catch (err) {
    return { ok: false, detail: `network_error:${(err as Error).message}` };
  }
}
