import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import AddTableForm from "../components/AddTableForm.jsx";
import TableCard from "../components/TableCard.jsx";
import { getBranch } from "../config/branches.js";
import { loadTables, addTablesBulk, removeTable } from "../lib/storage.js";

export default function AdminPage() {
  const { branchId } = useParams();
  const branch = getBranch(branchId);
  const [tables, setTables] = useState([]);

  useEffect(() => {
    if (branch) setTables(loadTables(branchId));
  }, [branchId, branch]);

  if (!branch) {
    return <Navigate to="/" replace />;
  }

  function handleAdd(name, qty) {
    const { tables: next } = addTablesBulk(branchId, name, qty);
    setTables(next);
  }

  function handleDelete(id) {
    if (!window.confirm("Bu stolni va uning QR kodini o'chirmoqchimisiz?")) return;
    setTables(removeTable(branchId, id));
  }

  return (
    <div className="page">
      <header className="page__header">
        <Link to="/" className="back-link">
          ← Filiallar
        </Link>
        <span className="eyebrow">{branch.name}</span>
        <h1>Ofitsiant chaqiruv tizimi</h1>
        <p className="lede">
          Har bir stol uchun QR kod yarating, uni stolga yopishtiring. Mehmon
          skanerlaganda, shu filialning ofitsiantiga Telegram orqali darhol
          xabar boradi — server yoki qo'shimcha ilova kerak emas.
        </p>
      </header>

      <AddTableForm onAdd={handleAdd} />

      {tables.length === 0 ? (
        <div className="empty">
          Hali stol qo'shilmagan. Yuqoridagi maydonga stol raqami yoki nomini
          kiriting va "Qo'shish" tugmasini bosing.
        </div>
      ) : (
        <div className="grid">
          {tables.map((t) => (
            <TableCard key={t.id} branchId={branchId} table={t} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
