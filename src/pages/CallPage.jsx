import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { callWaiter } from "../lib/telegram.js";
import { getBranch } from "../config/branches.js";

const COOLDOWN_MS = 60_000;

export default function CallPage() {
  const [params] = useSearchParams();
  const branchId = params.get("branch") || "";
  const branch = getBranch(branchId);
  const tableName = params.get("table") || "Noma'lum stol";
  const tableId = params.get("id") || "unknown";
  const cooldownKey = `waiter-cooldown-${branchId}-${tableId}`;

  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(0);

  const initialRemaining = useMemo(() => {
    const last = Number(localStorage.getItem(cooldownKey) || 0);
    const remaining = COOLDOWN_MS - (Date.now() - last);
    return remaining > 0 ? remaining : 0;
  }, [cooldownKey]);

  useEffect(() => {
    if (initialRemaining > 0) {
      setStatus("sent");
      setSecondsLeft(Math.ceil(initialRemaining / 1000));
    }
  }, [initialRemaining]);

  useEffect(() => {
    if (status !== "sent" || secondsLeft <= 0) return;
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [status, secondsLeft]);

  async function handleCall() {
    setStatus("sending");
    setErrorMsg("");
    try {
      await callWaiter(branchId, tableName);
      localStorage.setItem(cooldownKey, String(Date.now()));
      setStatus("sent");
      setSecondsLeft(Math.ceil(COOLDOWN_MS / 1000));
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Xatolik yuz berdi. Qaytadan urinib ko'ring.");
    }
  }

  const canCall = status === "idle" || status === "error";

  if (!branch) {
    return (
      <div className="call-page">
        <div className="call-card">
          <h1>Filial topilmadi</h1>
          <p className="call-card__hint">
            Bu QR kod noto'g'ri yoki eskirgan. Iltimos, ofitsiantdan yordam
            so'rang.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="call-page">
      <div className="call-card">
        <span className="eyebrow">{branch.name}</span>
        <h1>{tableName}</h1>

        {status === "sent" ? (
          <>
            <div className="call-card__success">✅ So'rovingiz yuborildi</div>
            <p className="call-card__hint">
              Ofitsiant tez orada stolingizga yaqinlashadi.
              {secondsLeft > 0 && (
                <> Qayta chaqirish uchun {secondsLeft} soniya kuting.</>
              )}
            </p>
          </>
        ) : (
          <p className="call-card__hint">
            Yordam kerakmi? Quyidagi tugmani bosing — ofitsiantga darhol
            xabar boradi.
          </p>
        )}

        <button
          type="button"
          className="call-button"
          disabled={!canCall || status === "sending"}
          onClick={handleCall}
        >
          {status === "sending" ? "Yuborilmoqda..." : "🔔 Ofitsiantni chaqirish"}
        </button>

        {status === "error" && <p className="call-card__error">{errorMsg}</p>}
      </div>
    </div>
  );
}
