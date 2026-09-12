import { Link } from "react-router-dom";
import { BRANCHES } from "../config/branches.js";

export default function BranchListPage() {
  return (
    <div className="page">
      <header className="page__header">
        <span className="eyebrow">Filiallar</span>
        <h1>Ofitsiant chaqiruv tizimi</h1>
        <p className="lede">
          Boshqarmoqchi bo'lgan filialni tanlang. Har bir filialning stollari,
          QR kodlari va Telegram boti alohida-alohida ishlaydi.
        </p>
      </header>

      <div className="grid grid--branches">
        {BRANCHES.map((b) => (
          <Link key={b.id} to={`/admin/${b.id}`} className="branch-card">
            <span className="branch-card__eyebrow">Filial</span>
            <h3>{b.name}</h3>
            <span className="branch-card__cta">Stollarni boshqarish →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
