function Button({
  children,
  onClick,
  type = "button",
  size = "md",
  className = "",
  disabled = false,
}) {
  const sizes = {
    sm: "px-3 py-1.5 text-xs md:text-sm",
    md: "px-4 py-2 text-sm md:text-base",
    lg: "px-6 py-3 text-base md:text-lg",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
      ${sizes[size]}
      rounded-xl
      bg-[#2E7D32]
      hover:bg-[#1B5E20]
      disabled:bg-gray-400 disabled:cursor-not-allowed
      text-white
      font-medium
      shadow-md
      hover:shadow-lg
      transition-all
      duration-200
      active:scale-95
      ${className}
      `}
    >
      {children}
    </button>
  );
}

export default Button;