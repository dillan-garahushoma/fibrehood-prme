import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { MAX_COMPARE } from './data/plans';

const plain = (s) => s.replaceAll('**', '');

export default function CompareTray({ plans, onRemove, onClear, onSelectPlan }) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef(null);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  // Close the dialog if selection drops below two plans.
  useEffect(() => {
    if (plans.length < 2) setOpen(false);
  }, [plans.length]);

  return (
    <>
      {plans.length > 0 && (
        <div className="fh-tray" role="region" aria-label="Plan comparison">
          <span className="fh-tray__count">
            {plans.length} of {MAX_COMPARE} selected
          </span>
          <div className="fh-tray__chips">
            {plans.map((p) => (
              <span className="fh-chip" key={p.id}>
                {p.name}
                <button type="button" aria-label={`Remove ${p.name}`} onClick={() => onRemove(p.id)}>
                  <X size={14} aria-hidden="true" />
                </button>
              </span>
            ))}
          </div>
          <button type="button" className="fh-tray__clear" onClick={onClear}>
            Clear
          </button>
          <button
            type="button"
            className="fh-btn fh-btn--gold fh-btn--sm"
            disabled={plans.length < 2}
            onClick={() => setOpen(true)}
          >
            Compare
          </button>
        </div>
      )}

      <dialog
        ref={dialogRef}
        className="fh-dialog"
        aria-labelledby="fh-compare-title"
        onClose={() => setOpen(false)}
        onClick={(e) => {
          if (e.target === dialogRef.current) setOpen(false);
        }}
      >
        <div className="fh-dialog__head">
          <h2 id="fh-compare-title">Compare plans</h2>
          <button type="button" className="fh-btn fh-btn--ghost fh-btn--sm" onClick={() => setOpen(false)}>
            <X size={16} aria-hidden="true" /> Close
          </button>
        </div>
        <div className="fh-dialog__body">
          <table className="fh-table">
            <thead>
              <tr>
                <th scope="col">
                  <span className="fh-sr">Feature</span>
                </th>
                {plans.map((p) => (
                  <th key={p.id} scope="col">
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Download</th>
                {plans.map((p) => (
                  <td key={p.id}>{p.down} Mbps</td>
                ))}
              </tr>
              <tr>
                <th scope="row">Upload</th>
                {plans.map((p) => (
                  <td key={p.id}>{p.symmetric ? `${p.down} Mbps (symmetric)` : `${p.up} Mbps`}</td>
                ))}
              </tr>
              <tr>
                <th scope="row">Price</th>
                {plans.map((p) => (
                  <td key={p.id}>
                    <strong>${p.price}</strong> / month
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row">Best for</th>
                {plans.map((p) => (
                  <td key={p.id}>{p.tagline}</td>
                ))}
              </tr>
              <tr>
                <th scope="row">Includes</th>
                {plans.map((p) => (
                  <td key={p.id}>
                    <ul>
                      {p.features.map((f) => (
                        <li key={f}>{plain(f)}</li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row">
                  <span className="fh-sr">Choose</span>
                </th>
                {plans.map((p) => (
                  <td key={p.id}>
                    <button
                      type="button"
                      className="fh-btn fh-btn--navy fh-btn--sm"
                      onClick={() => {
                        setOpen(false);
                        onSelectPlan?.(p);
                      }}
                    >
                      Select package
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </dialog>
    </>
  );
}
