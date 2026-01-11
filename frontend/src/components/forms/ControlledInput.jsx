import { Controller } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

/**
 * Reusable controlled input field with react-hook-form
 * Handles label, error display, and styling automatically
 */
export default function ControlledInput({
  name,
  control,
  label,
  error,
  placeholder = "",
  type = "text",
  optional = false,
  ...props
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>
        {label} {optional && <span className="text-muted-foreground">(Optional)</span>}
      </Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            id={name}
            type={type}
            placeholder={placeholder}
            className={error ? "border-destructive" : ""}
            {...props}
          />
        )}
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
