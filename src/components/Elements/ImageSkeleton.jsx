export function ImageSkeleton() {
  return (
    <div
      role="status"
      className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center">
      <div className="w-[50%] md:w-full">
        <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4" />
        <div className="h-2 bg-gray-200 rounded-full max-w-[480px] mb-2.5" />
        <div className="h-2 bg-gray-200 rounded-full mb-2.5" />
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
