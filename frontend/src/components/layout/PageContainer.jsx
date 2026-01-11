/**
 * Standard page container with responsive padding
 * Used across all pages for consistent layout
 */
export default function PageContainer({
  children,
  className = "",
  childrenClassName = "",
}) {
  return (
    <div className={`min-h-screen bg-background ${className}`}>
      <div
        className={`container mx-auto px-4 sm:px-6 lg:px-8 py-8 ${childrenClassName}`}
      >
        {children}
      </div>
    </div>
  );
}
