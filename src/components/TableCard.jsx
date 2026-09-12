import { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { buildCallUrl } from "../lib/storage.js";

export default function TableCard({ branchId, table, onDelete }) {
  const canvasRef = useRef(null);
  const url = buildCallUrl(branchId, table);

  function handleDownload() {
    const canvas = canvasRef.current?.querySelector("canvas");
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `stol-${table.name.replace(/\s+/g, "-")}-qr.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  return (
    <article className="ticket">
      <div className="ticket__stub">
        <span className="ticket__label">Stol</span>
        <h3 className="ticket__name">{table.name}</h3>
      </div>
      <div className="ticket__perforation" aria-hidden="true" />
      <div className="ticket__qr" ref={canvasRef}>
        <QRCodeCanvas value={url} size={168} level="M" includeMargin={false} />
      </div>
      <div className="ticket__actions">
        <button type="button" onClick={handleDownload}>
          Yuklab olish
        </button>
        <button type="button" className="ticket__ghost" onClick={() => window.open(url, "_blank")}>
          Sinab ko'rish
        </button>
        <button type="button" className="ticket__danger" onClick={() => onDelete(table.id)}>
          O'chirish
        </button>
      </div>
    </article>
  );
}
