/**
 * Content wrapper with configurable max-width
 * Centers content and applies max-width constraint
 */
export default function PageContent({ 
  children, 
  maxWidth = "6xl", // Options: "3xl", "4xl", "6xl", "none"
  className = "" 
}) {
  const maxWidthClass = maxWidth === "none" ? "" : `max-w-${maxWidth}`;
  
  return (
    <div className={`${maxWidthClass} mx-auto ${className}`}>
      {children}
    </div>
  );
}
