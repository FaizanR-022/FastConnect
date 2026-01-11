import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

/**
 * Empty state display for not found or no data scenarios
 * Shows a centered message with optional action button
 */
export default function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  icon: Icon,
  className = ""
}) {
  return (
    <Card className={`text-center py-12 ${className}`}>
      <CardContent className="pt-6">
        {Icon && (
          <div className="flex justify-center mb-4">
            <Icon className="w-12 h-12 text-muted-foreground" />
          </div>
        )}
        <h3 className="text-xl font-medium mb-2">{title}</h3>
        {description && (
          <p className="text-muted-foreground mb-4">{description}</p>
        )}
        {actionLabel && onAction && (
          <Button onClick={onAction}>{actionLabel}</Button>
        )}
      </CardContent>
    </Card>
  );
}
