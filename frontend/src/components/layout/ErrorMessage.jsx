/**
 * Consistent error message display
 * Shows error in a styled alert box
 */
export default function ErrorMessage({ 
  children,
  className = "mb-6" 
}) {
  if (!children) return null;

  return (
    <div className={`p-4 text-sm text-destructive bg-destructive/10 rounded-lg ${className}`}>
      {children}
    </div>
  );
}
