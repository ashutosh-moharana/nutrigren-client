import Badge from "./Badge";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  className = "",
}) {
  return (
    <div className={`space-y-3 text-center ${className}`}>
      {eyebrow && <Badge>{eyebrow}</Badge>}
      <h2 className="text-3xl md:text-4xl font-display font-semibold text-heading">
        {title}
      </h2>
      {description && (
        <p className="text-base md:text-lg text-subtle max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}

