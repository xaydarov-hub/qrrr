import { useState } from "react";

export default function AddTableForm({ onAdd }) {
  const [name, setName] = useState("");
  const [qty, setQty] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    onAdd(trimmed, qty);
    setName("");
    setQty(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <label htmlFor="table-name">Stol raqami yoki nomi</label>
      <div className="add-form__row">
        <input
          id="table-name"
          type="text"
          placeholder="Masalan: 12-stol yoki Terassa"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="off"
        />
        <div className="add-form__qty">
          <label htmlFor="table-qty">Soni</label>
          <input
            id="table-qty"
            type="number"
            min={1}
            max={200}
            value={qty}
            onChange={(e) => setQty(e.target.value)}
          />
        </div>
        <button type="submit">Qo'shish</button>
      </div>
      <p className="add-form__hint">
        Soni 1 dan katta bo'lsa, masalan "Terassa" + 10 kiritsangiz,{" "}
        <b>Terassa_1</b> dan <b>Terassa_10</b> gacha 10 ta stol bir yo'la
        yaratiladi.
      </p>
    </form>
  );
}
