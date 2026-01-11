/**
 * Two-column layout with 2:1 ratio (main:sidebar)
 * Main content takes 2/3, sidebar takes 1/3 on large screens
 * Stacks vertically on mobile
 */
export default function TwoColumnLayout({ 
  main, 
  sidebar,
  className = "" 
}) {
  return (
    <div className={`grid lg:grid-cols-3 gap-8 ${className}`}>
      {/* Main Content - 2 columns */}
      <div className="lg:col-span-2">
        {main}
      </div>

      {/* Sidebar - 1 column */}
      <div className="space-y-6">
        {sidebar}
      </div>
    </div>
  );
}
