/**
 * Display error and success alert messages
 */
export default function AlertMessages({ error, success }) {
  if (!error && !success) return null;

  return (
    <>
      {error && (
        <div className="p-4 mb-6 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="p-4 mb-6 bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-800 dark:text-green-200 text-sm">
          {success}
        </div>
      )}
    </>
  );
}
