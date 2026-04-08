import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { PrivacyNoticeContent } from "./PrivacyNoticeContent";

type PrivacyNoticeModalProps = {
  open: boolean;
  onClose: () => void;
};

export function PrivacyNoticeModal({ open, onClose }: PrivacyNoticeModalProps) {
  const titleId = useId();
  const contactHeadingId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    queueMicrotask(() => {
      panelRef.current?.focus();
    });
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-end justify-center p-0 sm:items-center sm:p-4"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
        aria-label="Cerrar aviso de privacidad"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="relative z-[1] flex max-h-[min(92dvh,44rem)] w-full max-w-lg flex-col rounded-t-2xl border border-stone-200/90 bg-[#f3f1eb] shadow-[0_-12px_48px_-8px_rgba(0,0,0,0.35)] outline-none sm:max-w-2xl sm:rounded-2xl sm:shadow-[0_24px_64px_-16px_rgba(18,43,64,0.35)] md:max-h-[calc(100dvh-2rem)] md:max-w-3xl lg:max-w-[52rem]"
      >
        <div className="flex shrink-0 items-center justify-end border-b border-stone-200/80 px-4 py-3 sm:px-5 md:py-2.5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-1.5 text-sm font-semibold text-[#122b40] underline-offset-2 transition hover:bg-stone-200/60 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3d657d]"
          >
            Cerrar
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-2 sm:px-6 sm:pb-6 sm:pt-3 md:max-h-[calc(100dvh-6rem)] md:pb-5 md:pt-2 lg:px-8">
          <PrivacyNoticeContent
            darkMode={false}
            titleAs="h2"
            titleId={titleId}
            contactHeadingId={contactHeadingId}
          />
        </div>
      </div>
    </div>,
    document.body,
  );
}
