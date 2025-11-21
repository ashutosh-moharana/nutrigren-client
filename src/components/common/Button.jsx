const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed";

const variants = {
  primary:
    "bg-primary text-primary-foreground hover:-translate-y-0.5 hover:shadow-soft px-6 py-3",
  outline:
    "border border-foreground/10 text-foreground hover:bg-foreground/5 px-6 py-3",
  ghost:
    "text-foreground/70 hover:text-foreground hover:bg-foreground/5 px-4 py-2",
  muted:
    "bg-muted text-muted-foreground hover:bg-muted/80 px-5 py-3 rounded-2xl",
};

export default function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}) {
  return (
    <button
      className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

