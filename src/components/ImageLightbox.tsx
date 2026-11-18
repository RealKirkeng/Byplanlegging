'use client';

import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';
import type { GalleryImage } from '@/lib/types';

interface ImageLightboxProps {
  images: GalleryImage[];
  title: string;
  actorName: string;
  openIndex: number | null;
  onClose: () => void;
}

export function ImageLightbox({
  images,
  title,
  actorName,
  openIndex,
  onClose,
}: ImageLightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (openIndex !== null) {
      setActiveIndex(openIndex);
      if (!dialog.open) {
        dialog.showModal();
      }
    } else if (dialog.open) {
      dialog.close();
    }
  }, [openIndex]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      dialog.returnValue = '';
      onClose();
    };

    dialog.addEventListener('close', handleClose);
    return () => dialog.removeEventListener('close', handleClose);
  }, [onClose]);

  // Fallback light-dismiss for nettlesere uten <dialog closedby="any">
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || typeof HTMLDialogElement === 'undefined') return;
    if ('closedBy' in HTMLDialogElement.prototype) return;

    const isOutside = (e: PointerEvent) => {
      const r = dialog.getBoundingClientRect();
      return (
        e.clientX < r.left ||
        e.clientX > r.right ||
        e.clientY < r.top ||
        e.clientY > r.bottom
      );
    };

    let pressedOutside = false;
    const onPointerDown = (e: PointerEvent) => {
      pressedOutside = isOutside(e);
    };
    const onPointerUp = (e: PointerEvent) => {
      if (pressedOutside && isOutside(e)) {
        dialog.close();
      }
      pressedOutside = false;
    };

    dialog.addEventListener('pointerdown', onPointerDown);
    dialog.addEventListener('pointerup', onPointerUp);
    return () => {
      dialog.removeEventListener('pointerdown', onPointerDown);
      dialog.removeEventListener('pointerup', onPointerUp);
    };
  }, []);

  const current = images[activeIndex] ?? images[0];
  const hasMultiple = images.length > 1;

  const goPrev = () =>
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  const goNext = () => setActiveIndex((prev) => (prev + 1) % images.length);

  return (
    <dialog
      ref={dialogRef}
      className="lightbox-dialog"
      aria-labelledby={titleId}
      {...({ closedby: 'any' } as Record<string, string>)}
    >
      <div className="lightbox-toolbar">
        <div>
          <span
            className="font-mono-meta"
            style={{ color: 'var(--accent-brass)', display: 'block' }}
          >
            {actorName} · {current?.perspective ?? 'Illustrasjon'}
          </span>
          <h2
            id={titleId}
            className="font-display"
            style={{ margin: 0, fontSize: '1.35rem' }}
          >
            {title}
          </h2>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {hasMultiple && (
            <>
              <button
                type="button"
                className="btn btn-sm"
                onClick={goPrev}
                aria-label="Forrige illustrasjon"
              >
                <ChevronLeft size={16} aria-hidden="true" />
              </button>
              <span
                className="font-mono-meta"
                style={{ paddingInline: '0.4rem', color: 'var(--text-secondary)' }}
              >
                {activeIndex + 1} / {images.length}
              </span>
              <button
                type="button"
                className="btn btn-sm"
                onClick={goNext}
                aria-label="Neste illustrasjon"
              >
                <ChevronRight size={16} aria-hidden="true" />
              </button>
            </>
          )}
          <form method="dialog">
            <button
              type="submit"
              className="btn btn-sm"
              aria-label="Lukk illustrasjonsvisning"
              autoFocus
            >
              <X size={16} aria-hidden="true" />
              <span>Lukk</span>
            </button>
          </form>
        </div>
      </div>

      <div className="lightbox-stage">
        {current && (
          <img
            src={current.url}
            alt={current.caption}
            width={1600}
            height={900}
            fetchPriority="low"
          />
        )}
      </div>

      <div className="lightbox-caption">
        <span>{current?.caption}</span>
        <span className="font-mono-meta" style={{ color: 'var(--text-muted)' }}>
          Trykk Esc eller klikk utenfor for å lukke
        </span>
      </div>
    </dialog>
  );
}
