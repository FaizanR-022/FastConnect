/**
 * Standard page header with title and optional subtitle
 * Used for main page headings
 */
export default function PageHeader({
  title,
  subtitle,
  className = "mb-8 py-8",
}) {
  return (
    <div className={className}>
      <h1 className="text-4xl font-medium mb-2">{title}</h1>
      {subtitle && <p className="text-muted-foreground text-lg">{subtitle}</p>}
    </div>
  );
}
