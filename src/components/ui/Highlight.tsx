interface HighlightProps {
  children: React.ReactNode;
  color: string;
  className?: string;
}

/** Marker-style background highlight behind text, done in pure CSS. */
export default function Highlight({ children, color, className = "" }: HighlightProps) {
  return (
    <span
      className={className}
      style={{
        backgroundImage: `linear-gradient(${color}, ${color})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "0 88%",
        backgroundSize: "100% 0.5em",
        boxDecorationBreak: "clone",
        WebkitBoxDecorationBreak: "clone",
      }}
    >
      {children}
    </span>
  );
}
