export function VStack({ children, className }) {
  return <div className={`flex flex-col ${className}`}>{children}</div>;
}
