export function Button({
  children,
  className = "",
  variant = "default",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center font-medium transition-colors";

  const variants = {
    default: "",
    ghost: "bg-transparent hover:bg-gray-100",
    outline: "border",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}