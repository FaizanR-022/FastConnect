import { Controller } from "react-hook-form";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

/**
 * Reusable controlled select field with react-hook-form
 * Handles label, options, error display, and styling automatically
 */
export default function ControlledSelect({
  name,
  control,
  label,
  error,
  placeholder = "Select an option",
  options = [],
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
          <Select
            value={field.value?.toString() || ""}
            onValueChange={field.onChange}
            {...props}
          >
            <SelectTrigger
              id={name}
              className={error ? "border-destructive" : ""}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value.toString()}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
