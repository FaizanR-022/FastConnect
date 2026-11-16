import { useState } from "react";
import { AlertTriangle, X } from "lucide-react";

// Set to false once the backend is back online to hide this notice everywhere.
export const SHOW_SERVICE_NOTICE = true;

const DISMISS_KEY = "serviceNoticeDismissed";

const ServiceNotice = () => {
  const [dismissed, setDismissed] = useState(() => {
    try {
      return sessionStorage.getItem(DISMISS_KEY) === "true";
    } catch {
      return false;
    }
  });

  if (!SHOW_SERVICE_NOTICE || dismissed) return null;

  const handleDismiss = () => {
    try {
      sessionStorage.setItem(DISMISS_KEY, "true");
    } catch {
      // ignore storage errors
    }
    setDismissed(true);
  };

  return (
    <div
      role="status"
      className="w-full border-b border-amber-300 bg-amber-50 text-amber-900 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-100"
    >
      <div className="mx-auto flex max-w-7xl items-start gap-3 px-4 py-3 text-sm">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        <p className="flex-1 leading-relaxed">
          <span className="font-semibold">Backend temporarily offline.</span>{" "}
          FastConnect&apos;s backend was hosted on the AWS Free Tier, whose
          6-month period has ended. Login, sign-up, posts and other live data
          won&apos;t load until the server is migrated. Thanks for your
          patience!
        </p>
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss notice"
          className="shrink-0 rounded p-1 hover:bg-amber-100 dark:hover:bg-amber-900"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default ServiceNotice;
