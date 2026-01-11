import { Loader2 } from "lucide-react";

/**
 * Reusable loading spinner with different display modes
 * Supports centered, full-screen, and inline variants
 */
export default function LoadingSpinner({ 
  fullScreen = false,
  centered = true,
  size = "large", // "small", "medium", "large"
  className = ""
}) {
  const sizeClasses = {
    small: "w-6 h-6",
    medium: "w-8 h-8",
    large: "w-12 h-12"
  };

  const spinner = (
    <Loader2 className={`${sizeClasses[size]} animate-spin text-primary ${className}`} />
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {spinner}
      </div>
    );
  }

  if (centered) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        {spinner}
      </div>
    );
  }

  return spinner;
}
