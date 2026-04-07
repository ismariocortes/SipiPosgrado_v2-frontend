import { useState } from "react";

type UadySealProps = {
  className: string;
};

export function UadySeal({ className }: UadySealProps) {
  const [useImg, setUseImg] = useState(true);

  if (!useImg) {
    return (
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/40 bg-white/10 text-[0.65rem] font-bold tracking-wide text-white sm:h-10 sm:w-10 sm:text-xs">
        UADY
      </div>
    );
  }

  return (
    <img
      src="/images/uady-escudo.png"
      alt=""
      className={`object-contain object-left ${className}`}
      decoding="async"
      onError={() => setUseImg(false)}
    />
  );
}
