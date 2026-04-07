/** Padding para notch / home indicator (reutilizable en layouts de página). */
export const safeAreaStyle = {
  paddingTop: "max(0px, env(safe-area-inset-top, 0px))",
  paddingBottom: "max(0px, env(safe-area-inset-bottom, 0px))",
  paddingLeft: "max(0px, env(safe-area-inset-left, 0px))",
  paddingRight: "max(0px, env(safe-area-inset-right, 0px))",
} as const;
