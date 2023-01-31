export function TableSkeleton() {
  return (
    <table className="table table-zebra w-full">
      <thead>
        <SkeletonItem />
      </thead>
      <tbody>
        <SkeletonItem />
        <SkeletonItem />
        <SkeletonItem />
        <SkeletonItem />
        <SkeletonItem />
        <SkeletonItem />
        <SkeletonItem />
        <SkeletonItem />
        <SkeletonItem />
      </tbody>
    </table>
  );
}

export function SkeletonItem() {
  return (
    <tr>
      <td className="h-8 bg-gray-200 mt-3 mb-6 rounded animate-pulse" />
    </tr>
  );
}
