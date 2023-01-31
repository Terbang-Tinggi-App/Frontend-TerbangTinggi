export function TextSkeleton({ className }) {
  return (
    <div role="status" className="max-w-sm animate-pulse">
      <div className={`h-2.5 bg-gray-200 rounded-full w-48 mb-4 ${className}`} />
      <span className="sr-only">Loading...</span>
    </div>
  );
}
