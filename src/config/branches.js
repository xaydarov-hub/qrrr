// Har bir filial uchun alohida Telegram bot va chat ID.
// Hozircha ikkalasi ham bitta chat ID'ga (sinov uchun) yuboradi —
// .env faylidagi izohni o'qing.
export const BRANCHES = [
  {
    id: "ihlos",
    name: "Sentr Ihlos oldi filiali",
    botToken: import.meta.env.VITE_IHLOS_BOT_TOKEN,
    chatId: import.meta.env.VITE_IHLOS_CHAT_ID,
  },
  {
    id: "sanat",
    name: "San'at saroyi oldi filiali",
    botToken: import.meta.env.VITE_SANAT_BOT_TOKEN,
    chatId: import.meta.env.VITE_SANAT_CHAT_ID,
  },
];

export function getBranch(id) {
  return BRANCHES.find((b) => b.id === id) || null;
}
