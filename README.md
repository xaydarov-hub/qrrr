# Ofitsiant chaqiruv tizimi — 2 filial (faqat frontend, React)

Ikkita filial uchun mo'ljallangan, har biri o'z Telegram botiga ega bo'lgan
QR-kod orqali ofitsiant chaqirish tizimi. Backend/server kerak emas.

## Filiallar

| Filial | Bot |
|---|---|
| Sentr Ihlos oldi filiali | o'z toke ni bilan ishlaydi |
| San'at saroyi oldi filiali | o'z toke ni bilan ishlaydi |

Hozircha **ikkalasi ham sinov uchun bitta chat ID'ga** (5916247309) xabar
yuboradi. Buni keyinchalik alohida-alohida chat ID'larga o'zgartirish uchun
`.env` faylidagi izohni o'qing — faqat ikkita qatorni almashtirasiz.

## Qanday ishlaydi

1. Bosh sahifada ikkita filial kartasi ko'rinadi — kerakli filialni tanlaysiz.
2. O'sha filialning admin sahifasida stol qo'shasiz:
   - **Bitta stol**: nomini yozib, "Soni" ni 1 qoldirib, "Qo'shish" bosasiz.
   - **Ko'p stol bir yo'la**: nomini yozib (masalan "Terassa"), "Soni"ga
     10 kiritsangiz — **Terassa_1, Terassa_2, ... Terassa_10** deb 10 ta
     stol bir zumda yaratiladi.
3. Har bir stol uchun QR kod avtomatik chiqadi — yuklab olib chop etasiz va
   stolga yopishtirasiz.
4. Mehmon QR kodni skanerlaganda, o'sha **aynan shu filialga tegishli**
   bot orqali sizga (chat ID'ga) xabar boradi: qaysi filial, qaysi stol,
   qachon.
5. Bitta qurilmadan bir stol uchun qayta-qayta yuborishning oldini olish
   uchun 60 soniyalik kutish (cooldown) bor.

QR kod ichida filial ID'si, stol nomi va stol ID'si URL parametr sifatida
saqlanadi — shuning uchun ma'lumotlar bazasi yoki serverga ehtiyoj yo'q.

## O'rnatish

```bash
npm install
npm run dev
```

`http://localhost:5173` — filiallarni tanlash sahifasi ochiladi.

`.env` fayli ikkala filialning bot tokeni va chat ID bilan tayyor
to'ldirilgan:

```
VITE_IHLOS_BOT_TOKEN=...   VITE_IHLOS_CHAT_ID=5916247309
VITE_SANAT_BOT_TOKEN=...   VITE_SANAT_CHAT_ID=5916247309
```

## Chat ID'larni keyinchalik ajratish

Har bir filialga alohida menejer/ofitsiant biriktirmoqchi bo'lsangiz:

1. O'sha odam o'ziga tegishli botga (Ihlos yoki San'at saroyi) `/start`
   yozsin (yoki istalgan xabar).
2. Brauzerda oching: `https://api.telegram.org/bot<TOKEN>/getUpdates` —
   javobda uning `chat.id` qiymatini ko'rasiz.
3. `.env` faylida `VITE_IHLOS_CHAT_ID` yoki `VITE_SANAT_CHAT_ID`
   qiymatini shu yangi ID'ga almashtiring va saytni qayta build/deploy
   qiling.

## Ishga tushirishdan oldin: botlarga /start bosing

Har ikkala bot ham faqat o'zi bilan avval suhbat boshlagan (`/start`
bosgan) chat ID'larga xabar yubora oladi. Shuning uchun `5916247309`
ID'siga tegishli Telegram akkaunt har ikkala botga (Ihlos va San'at
saroyi) alohida-alohida `/start` bosishi kerak.

## Production uchun build va joylashtirish

```bash
npm run build
```

`dist/` papkasini istalgan statik hostingga (Netlify, Vercel, va h.k.)
joylashtirasiz. **Avval saytni joylang, keyin o'sha domendan turib
stollarni qo'shing** — aks holda QR kodlar ichida `localhost` qolib
ketadi.

GitHub Pages kabi subpapkali hostingda `vite.config.js` dagi `base`
qiymatini moslang.

## Xavfsizlik haqida eslatma

Bu loyiha butunlay frontendda ishlagani uchun, har ikkala bot tokeni
saytning JavaScript kodi ichida ochiq turadi. Oddiy "ofitsiant chaqirish"
funksiyasi uchun bu odatda muammo emas, lekin xavfsizlik muhim bo'lsa,
keyinchalik kichik bir backend (masalan, serverless function) orqali
tokenlarni yashirish mumkin.

## Papka tuzilishi

```
src/
  config/
    branches.js     — ikkala filialning bot tokeni/chat ID sozlamalari
  lib/
    telegram.js      — filialga mos botdan xabar yuborish
    storage.js        — stollarni filial bo'yicha localStorage'da saqlash,
                         bitta/ko'p stol qo'shish, QR URL yasash
  components/
    AddTableForm.jsx  — bitta yoki ko'p stol qo'shish formasi
    TableCard.jsx      — QR kod, yuklab olish, o'chirish
  pages/
    BranchListPage.jsx — filiallarni tanlash (bosh sahifa, "/")
    AdminPage.jsx        — tanlangan filial stollarini boshqarish
                            ("/admin/:branchId")
    CallPage.jsx          — mehmon ko'radigan chaqiruv sahifasi ("/call")
```
# qrrr
# qrrr
