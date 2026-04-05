export function Input({ className = "", ...props }) {
  return (
    <input
      className={`h-12 w-full rounded-xl border border-gray-300 bg-white px-4 text-base outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200 ${className}`}
      {...props}
    />
  );
}