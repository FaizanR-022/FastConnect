import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

/**
 * Consistent back navigation button
 * Goes back in history by default, or to custom route
 */
export default function BackButton({ 
  label = "Back", 
  onClick,
  className = "mb-6"
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(-1);
    }
  };

  return (
    <Button 
      variant="ghost" 
      onClick={handleClick} 
      className={`gap-2 ${className}`}
    >
      <ArrowLeft className="w-4 h-4" />
      {label}
    </Button>
  );
}
