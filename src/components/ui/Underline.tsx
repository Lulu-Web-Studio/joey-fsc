interface UnderlineProps {
  children: React.ReactNode;
  color: string;
  className?: string;
}

/** Hand-drawn-style squiggly underline, done in pure CSS (text-decoration-style: wavy). */
export default function Underline({ children, color, className = "" }: UnderlineProps) {
  return (
    <span
      className={className}
      style={{
        textDecorationLine: "underline",
        textDecorationStyle: "wavy",
        textDecorationColor: color,
        textDecorationThickness: "0.08em",
        textUnderlineOffset: "0.2em",
      }}
    >
      {children}
    </span>
  );
}
