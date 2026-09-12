function keyFor(branchId) {
  return `waiter-tables-v2-${branchId}`;
}

export function loadTables(branchId) {
  try {
    const raw = localStorage.getItem(keyFor(branchId));
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveTables(branchId, tables) {
  localStorage.setItem(keyFor(branchId), JSON.stringify(tables));
}

function makeId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

/** Bitta stol qo'shadi. */
export function addTable(branchId, name) {
  const tables = loadTables(branchId);
  const table = { id: makeId(), name: name.trim(), createdAt: Date.now() };
  const next = [...tables, table];
  saveTables(branchId, next);
  return { tables: next, table };
}

/**
 * Ko'p stol qo'shadi: agar qty > 1 bo'lsa, "Terassa" + 5 -> Terassa_1 ...
 * Terassa_5. Agar qty === 1 bo'lsa, oddiy bitta stol sifatida qo'shadi
 * (raqam qo'shilmaydi).
 */
export function addTablesBulk(branchId, baseName, qty) {
  const trimmed = baseName.trim();
  const count = Math.max(1, Math.min(200, Number(qty) || 1));
  const tables = loadTables(branchId);
  const created = [];

  if (count === 1) {
    created.push({ id: makeId(), name: trimmed, createdAt: Date.now() });
  } else {
    for (let i = 1; i <= count; i++) {
      created.push({
        id: makeId(),
        name: `${trimmed}_${i}`,
        createdAt: Date.now() + i,
      });
    }
  }

  const next = [...tables, ...created];
  saveTables(branchId, next);
  return { tables: next, created };
}

export function removeTable(branchId, id) {
  const next = loadTables(branchId).filter((t) => t.id !== id);
  saveTables(branchId, next);
  return next;
}

export function buildCallUrl(branchId, table) {
  const origin = window.location.origin + window.location.pathname;
  const params = new URLSearchParams({
    branch: branchId,
    table: table.name,
    id: table.id,
  });
  return `${origin}#/call?${params.toString()}`;
}
