import { getBranch } from "../config/branches.js";

/**
 * Berilgan filialning botidan foydalanib, o'sha filialga biriktirilgan
 * chat ID'ga to'g'ridan-to'g'ri Telegram Bot API orqali xabar yuboradi.
 * Backend shart emas — Telegram Bot API brauzerdan chaqirishga (CORS)
 * ruxsat beradi.
 */
export async function callWaiter(branchId, tableName) {
  const branch = getBranch(branchId);
  if (!branch) {
    throw new Error("Filial topilmadi.");
  }
  if (!branch.botToken || !branch.chatId) {
    throw new Error(
      "Bu filial uchun bot sozlamalari topilmadi. .env faylini tekshiring."
    );
  }

  const time = new Date().toLocaleString("uz-UZ", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
  });

  const text = `🔔 Ofitsiant chaqirilmoqda!\n🏠 Filial: ${branch.name}\n🍽 Stol: ${tableName}\n🕒 Vaqt: ${time}`;

  const res = await fetch(
    `https://api.telegram.org/bot${branch.botToken}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: branch.chatId,
        text,
      }),
    }
  );

  const data = await res.json();
  if (!data.ok) {
    throw new Error(data.description || "Telegramga xabar yuborib bo'lmadi.");
  }
  return data;
}
