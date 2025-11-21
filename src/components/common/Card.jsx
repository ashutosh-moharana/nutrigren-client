export default function Card({ children, className = "", ...props }) {
  return (
    <div
      className={`rounded-3xl border border-white/60 bg-card text-card-foreground 
        shadow-soft ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

