function Button({
  children,
  onClick,
  type = "button",
  size = "md",
  className = "",
}) {
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`
      ${sizes[size]}
      rounded-full
      bg-[#2E7D32]
      hover:bg-[#1B5E20]
      text-white
      font-semibold
      shadow-lg
      hover:shadow-xl
      transition-all
      duration-300
      hover:scale-105
      ${className}
      `}
    >
      {children}
    </button>
  );
}

export default Button;