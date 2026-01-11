/**
 * Display read-only account information
 */
export default function ReadOnlyInfo({ user }) {
  if (!user) return null;

  const fields = [
    { label: "Email", value: user.email },
    { label: "Department", value: user.department },
    { label: "Campus", value: user.campus },
    { label: "Graduation Year", value: user.graduationYear },
  ];

  return (
    <div className="mb-6">
      <p className="text-sm font-semibold text-muted-foreground mb-3">
        Account Information
      </p>
      <div className="space-y-2">
        {fields.map((field) => (
          <div key={field.label}>
            <span className="text-xs text-muted-foreground">{field.label}</span>
            <p className="text-sm font-medium">{field.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
