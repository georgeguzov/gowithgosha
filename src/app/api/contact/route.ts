const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 3;
const submissions = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (submissions.get(ip) ?? []).filter(t => now - t < RATE_LIMIT_WINDOW_MS);
  timestamps.push(now);
  submissions.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return Response.json({ error: "Too many requests" }, { status: 429 });
  }

  const { name, contact, comment, website, tripLabel } = await request.json();

  // Honeypot: real users never fill this hidden field.
  if (website?.trim()) {
    return Response.json({ ok: true });
  }

  if (!name?.trim() || !contact?.trim()) {
    return Response.json({ error: "Missing fields" }, { status: 400 });
  }

  const trip = typeof tripLabel === "string" && tripLabel.trim() ? tripLabel.trim() : "Китай";

  const text = [
    `🔔 <b>Новая заявка на тур: ${trip}!</b>`,
    "",
    `👤 <b>Имя:</b> ${name.trim()}`,
    `📱 <b>Контакт:</b> ${contact.trim()}`,
    comment?.trim() ? `💬 <b>Комментарий:</b> ${comment.trim()}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const res = await fetch(
    `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text,
        parse_mode: "HTML",
      }),
    }
  );

  if (!res.ok) {
    return Response.json({ error: "Telegram error" }, { status: 500 });
  }

  return Response.json({ ok: true });
}