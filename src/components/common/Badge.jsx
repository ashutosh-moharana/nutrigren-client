export default function Badge({ children, className = "", ...props }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-primary ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
