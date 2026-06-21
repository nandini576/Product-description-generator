/**
 * Button Component
 *
 * Props:
 * - children
 * - variant: primary | secondary | outline
 * - size: sm | md | lg
 * - disabled
 * - onClick
 */

function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  onClick,
}) {
  const variants = {
    primary: "bg-gray-800 text-white",
    secondary: "bg-gray-500 text-white",
    outline: "border border-gray-400 text-gray-700",
  };

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-5 py-2",
    lg: "px-7 py-3 text-lg",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-lg transition ${variants[variant]} ${sizes[size]} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {children}
    </button>
  );
}

export default Button;