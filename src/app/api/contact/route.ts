export async function POST(request: Request) {
  const { name, contact, comment } = await request.json();

  if (!name?.trim() || !contact?.trim()) {
    return Response.json({ error: "Missing fields" }, { status: 400 });
  }

  const text = [
    "🔔 <b>Новая заявка на тур в Китай!</b>",
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